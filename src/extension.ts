import * as vscode from 'vscode';

function updateDecorations(editor: vscode.TextEditor | undefined) {
    if (!editor || editor.document.languageId !== 'plaintext') {
        return;
    }

    const document = editor.document;
    const text = document.getText();
    const lines = text.split('\n');

    const config = vscode.workspace.getConfiguration('textIndentHighlighter');
    const colors = config.get<string[]>('colors', ["#dc8580", "#f2e6b1", "#95dab6", "#83b2d0", "#7f87b2"]);

    const colorDecorationTypes: { [key: number]: vscode.TextEditorDecorationType } = {};
    for (let i = 0; i < colors.length; i++) {
        colorDecorationTypes[i + 1] = vscode.window.createTextEditorDecorationType({ color: colors[i] });
    }

    let ranges: { [key: number]: vscode.DecorationOptions[] } = {};

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const indentLevel = line.search(/\S|$/);

        if (indentLevel > 0 && colorDecorationTypes[indentLevel]) {
            if (!ranges[indentLevel]) {
                ranges[indentLevel] = [];
            }

            const range = new vscode.Range(new vscode.Position(i, 0), new vscode.Position(i, line.length));
            ranges[indentLevel].push({ range });
        }
    }

    for (let indentLevel in colorDecorationTypes) {
        editor.setDecorations(colorDecorationTypes[indentLevel], ranges[indentLevel] || []);
    }
}

export function activate(context: vscode.ExtensionContext) {
    console.log('The "text-indent-highlighter" extension is now active!');

    vscode.window.onDidChangeActiveTextEditor(editor => {
        if (editor) {
            updateDecorations(editor);
        }
    }, null, context.subscriptions);

    vscode.workspace.onDidOpenTextDocument(document => {
        const editor = vscode.window.visibleTextEditors.find(e => e.document === document);
        if (editor) {
            updateDecorations(editor);
        }
    }, null, context.subscriptions);

    vscode.workspace.onDidChangeTextDocument(event => {
        const editor = vscode.window.activeTextEditor;
        if (editor && event.document === editor.document) {
            updateDecorations(editor);
        }
    }, null, context.subscriptions);

    if (vscode.window.activeTextEditor) {
        updateDecorations(vscode.window.activeTextEditor);
    }

    vscode.window.showInformationMessage(
        'To customize indentation colors, add "textIndentHighlighter.colors" to your settings.json.'
    );
}

export function deactivate() {}

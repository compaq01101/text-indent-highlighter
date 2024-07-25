import * as vscode from 'vscode';

const colorDecorationTypes: { [key: number]: vscode.TextEditorDecorationType } = {
    1: vscode.window.createTextEditorDecorationType({ color: '#dc8580' }),
    2: vscode.window.createTextEditorDecorationType({ color: '#f2e6b1' }),
    3: vscode.window.createTextEditorDecorationType({ color: '#95dab6' }),
    4: vscode.window.createTextEditorDecorationType({ color: '#83b2d0' }),
    5: vscode.window.createTextEditorDecorationType({ color: '#7f87b2' })
    // Add more colors as needed
};

function updateDecorations(editor: vscode.TextEditor | undefined) {
    if (!editor) {
        return;
    }

    const document = editor.document;
    const text = document.getText();
    const lines = text.split('\n');

    let ranges: { [key: number]: vscode.DecorationOptions[] } = {};

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const indentLevel = line.search(/\S|$/);

        if (!ranges[indentLevel]) {
            ranges[indentLevel] = [];
        }

        const range = new vscode.Range(new vscode.Position(i, 0), new vscode.Position(i, line.length));
        ranges[indentLevel].push({ range });
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
        const editor = vscode.window.visibleTextEditors.find(e => e.document === event.document);
        if (editor) {
            updateDecorations(editor);
        }
    }, null, context.subscriptions);

    if (vscode.window.activeTextEditor) {
        updateDecorations(vscode.window.activeTextEditor);
    }
}

export function deactivate() {}

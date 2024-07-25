import * as vscode from 'vscode';

let colorDecorationTypes: { [key: number]: vscode.TextEditorDecorationType } = {};

function createColorDecorationTypes() {
    const config = vscode.workspace.getConfiguration('textIndentHighlighter');
    const colors = config.get<string[]>('colors', ["#dc8580", "#f2e6b1", "#95dab6", "#83b2d0", "#7f87b2"]);

    // 기존 장식 유형 제거
    for (const key in colorDecorationTypes) {
        if (colorDecorationTypes.hasOwnProperty(key)) {
            colorDecorationTypes[key].dispose();
        }
    }

    colorDecorationTypes = {};

    // 색상 장식 유형 생성
    for (let i = 0; i < colors.length; i++) {
        colorDecorationTypes[i] = vscode.window.createTextEditorDecorationType({ color: colors[i] });
    }
}

function updateDecorations(editor: vscode.TextEditor | undefined) {
    if (!editor || editor.document.languageId !== 'plaintext') {
        return;
    }

    const document = editor.document;
    const text = document.getText();
    const lines = text.split('\n');

    const config = vscode.workspace.getConfiguration('textIndentHighlighter');
    const colors = config.get<string[]>('colors', ["#dc8580", "#f2e6b1", "#95dab6", "#83b2d0", "#7f87b2"]);
    const colorCount = colors.length;

    let ranges: { [key: number]: vscode.DecorationOptions[] } = {};

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const indentLevel = line.search(/\S|$/);

        if (indentLevel > 0) {
            const colorIndex = (indentLevel - 1) % colorCount; // 색상 인덱스 계산
            if (!ranges[colorIndex]) {
                ranges[colorIndex] = [];
            }

            const range = new vscode.Range(new vscode.Position(i, 0), new vscode.Position(i, line.length));
            ranges[colorIndex].push({ range });
        }
    }

    for (let colorIndex in colorDecorationTypes) {
        editor.setDecorations(colorDecorationTypes[colorIndex], ranges[colorIndex] || []);
    }
}

function triggerUpdateDecorations() {
    createColorDecorationTypes(); // 색상 장식 유형 재생성
    const editors = vscode.window.visibleTextEditors;
    for (const editor of editors) {
        updateDecorations(editor);
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

    vscode.workspace.onDidChangeConfiguration(event => {
        if (event.affectsConfiguration('textIndentHighlighter.colors')) {
            triggerUpdateDecorations();
        }
    }, null, context.subscriptions);

    if (vscode.window.activeTextEditor) {
        triggerUpdateDecorations();
    }

    vscode.window.showInformationMessage(
        'To customize indentation colors, add "textIndentHighlighter.colors" to your settings.json.'
    );
}

export function deactivate() {
    for (const key in colorDecorationTypes) {
        if (colorDecorationTypes.hasOwnProperty(key)) {
            colorDecorationTypes[key].dispose();
        }
    }
}

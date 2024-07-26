import * as vscode from 'vscode';

let colorDecorationTypes: { [key: number]: vscode.TextEditorDecorationType } = {};

function createColorDecorationTypes(colors: string[]) {
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

function getIndentLevel(line: string, indentSize: number, useSpaces: boolean): number {
    let indentLevel = 0;
    const indentChar = useSpaces ? ' ' : '\t';

    for (let i = 0; i < line.length; i++) {
        if (line[i] === indentChar) {
            indentLevel++;
        } else {
            break;
        }
    }

    if (useSpaces) {
        indentLevel = Math.floor(indentLevel / indentSize);
    }

    return indentLevel;
}

function updateDecorations(editor: vscode.TextEditor | undefined, colors: string[]) {
    if (!editor || editor.document.languageId !== 'plaintext') {
        return;
    }

    const config = vscode.workspace.getConfiguration('editor', editor.document.uri);
    const indentSize = config.get<number>('tabSize', 4);
    const useSpaces = config.get<boolean>('insertSpaces', true);

    const document = editor.document;
    const text = document.getText();
    const lines = text.split('\n');
    const colorCount = colors.length;

    let ranges: { [key: number]: vscode.DecorationOptions[] } = {};

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const indentLevel = getIndentLevel(line, indentSize, useSpaces);

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
    const config = vscode.workspace.getConfiguration('textIndentHighlighter');
    const colors = config.get<string[]>('colors', []);

    if (colors.length === 0) {
        vscode.window.showErrorMessage('No colors configured for textIndentHighlighter. Please set "textIndentHighlighter.colors" in settings.json.');
        return;
    }

    createColorDecorationTypes(colors);
    const editors = vscode.window.visibleTextEditors;
    for (const editor of editors) {
        updateDecorations(editor, colors);
    }
}

function updateColorsSettingAndTriggerUpdate() {
    const config = vscode.workspace.getConfiguration('textIndentHighlighter');
    const colors = config.get<string[]>('colors', []);
    if (colors.length === 0) {
        config.update('colors', ["#dc8580", "#f2e6b1", "#95dab6", "#83b2d0", "#7f87b2"], vscode.ConfigurationTarget.Global).then(() => {
            vscode.window.showInformationMessage('Default colors added to settings.json.');
            // 설정 업데이트 후 데코레이션 트리거
            triggerUpdateDecorations();
        }, (error: any) => {
            console.error('Failed to update settings.json:', error);
        });
    } else {
        triggerUpdateDecorations();
    }
}

export function activate(context: vscode.ExtensionContext) {
    console.log('The "text-indent-highlighter" extension is now active!');
    updateColorsSettingAndTriggerUpdate();

    vscode.window.onDidChangeActiveTextEditor(editor => {
        if (editor) {
            const config = vscode.workspace.getConfiguration('textIndentHighlighter');
            const colors = config.get<string[]>('colors', []);
            updateDecorations(editor, colors);
        }
    }, null, context.subscriptions);

    vscode.workspace.onDidOpenTextDocument(document => {
        const editor = vscode.window.visibleTextEditors.find(e => e.document === document);
        if (editor) {
            const config = vscode.workspace.getConfiguration('textIndentHighlighter');
            const colors = config.get<string[]>('colors', []);
            updateDecorations(editor, colors);
        }
    }, null, context.subscriptions);

    vscode.workspace.onDidChangeTextDocument(event => {
        const editor = vscode.window.activeTextEditor;
        if (editor && event.document === editor.document) {
            const config = vscode.workspace.getConfiguration('textIndentHighlighter');
            const colors = config.get<string[]>('colors', []);
            updateDecorations(editor, colors);
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

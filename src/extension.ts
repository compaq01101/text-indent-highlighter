import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "text-indent-highlighter" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    const disposable = vscode.commands.registerCommand('text-indent-highlighter.helloWorld', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World from Text Indent Highlighter!');
    });

    context.subscriptions.push(disposable);

    // Add an event listener for document changes
    let disposableTextChange = vscode.workspace.onDidChangeTextDocument(event => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        const document = editor.document;
        const text = document.getText();
        const lines = text.split('\n');

        const colorDecorationTypes: { [key: number]: vscode.TextEditorDecorationType } = {
            1: vscode.window.createTextEditorDecorationType({ color: '#FF0000' }),
            2: vscode.window.createTextEditorDecorationType({ color: '#00FF00' }),
            3: vscode.window.createTextEditorDecorationType({ color: '#0000FF' }),
            // Add more colors as needed
        };

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
    });

    context.subscriptions.push(disposableTextChange);
}

// This method is called when your extension is deactivated
export function deactivate() {}

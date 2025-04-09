import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('extension.copyPathAtLine', () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) return;
      const filePath = editor.document.uri.fsPath;
      const lineNumber = editor.selection.active.line + 1;
      const fullPath = `${filePath}:${lineNumber}`;
      vscode.env.clipboard.writeText(fullPath);
      vscode.window.showInformationMessage(`Copied: ${fullPath}`);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('extension.copyRelativePathAtLine', () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor || !vscode.workspace.workspaceFolders) return;
      const fileUri = editor.document.uri;
      const workspaceFolder = vscode.workspace.getWorkspaceFolder(fileUri);
      if (!workspaceFolder) return;

      const relativePath = vscode.workspace.asRelativePath(fileUri);
      const lineNumber = editor.selection.active.line + 1;
      const pathWithLine = `${relativePath}:${lineNumber}`;
      vscode.env.clipboard.writeText(pathWithLine);
      vscode.window.showInformationMessage(`Copied: ${pathWithLine}`);
    })
  );
}

export function deactivate() {}
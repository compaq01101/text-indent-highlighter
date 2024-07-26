
# Text Indent Highlighter

**Text Indent Highlighter**는 Visual Studio Code에서 들여쓰기 수준에 따라 텍스트 색상을 변경해주는 확장 프로그램입니다.

**Text Indent Highlighter** is an extension for Visual Studio Code that changes text colors based on indentation levels.

## 기능 (Features)

- 텍스트 파일에서 들여쓰기 수준에 따라 텍스트 색상 변경
- 실시간으로 들여쓰기 색상 업데이트

- Changes text colors based on indentation levels in text files
- Real-time indentation color updates

## 설치 (Installation)

1. [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/)에서 **Text Indent Highlighter**를 검색합니다.
2. 설치 버튼을 클릭하여 확장 프로그램을 설치합니다.

1. Search for **Text Indent Highlighter** in the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/).
2. Click the install button to add the extension to Visual Studio Code.

## 설정 (Settings)

설치 후, `settings.json` 파일에 다음 설정을 추가하여 들여쓰기 색상을 사용자 정의할 수 있습니다:

After installation, you can customize indentation colors by adding the following settings to your `settings.json` file:

```json
{
  "textIndentHighlighter.colors": [
    "#ff0000",  // 1-level indent color
    "#00ff00",  // 2-level indent color
    "#0000ff",  // 3-level indent color
    "#ffff00",  // 4-level indent color
    "#ff00ff"   // 5-level indent color
  ]
}
```

## 사용 방법 (Usage)

1. Visual Studio Code에서 `.txt` 파일을 엽니다.
2. 들여쓰기를 사용하여 텍스트를 작성하면, 각 들여쓰기 수준에 따라 텍스트 색상이 변경됩니다.

1. Open a `.txt` file in Visual Studio Code.
2. Write text using indentation, and the text color will change based on the indentation level.

## 기여 (Contributing)

기여를 원하시면, [GitHub 저장소](https://github.com/compaq01101/text-indent-highlighter)를 방문하여 풀 리퀘스트를 제출해 주세요.

If you want to contribute, please visit the [GitHub repository](https://github.com/compaq01101/text-indent-highlighter) and submit a pull request.

## 라이선스 (License)

이 확장 프로그램은 [Custom License](LICENSE)에 따라 배포됩니다.

This extension is distributed under the [Custom License](LICENSE).

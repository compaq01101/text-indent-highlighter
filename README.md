# Text Indent Highlighter

**Text Indent Highlighter**는 Visual Studio Code에서 들여쓰기 수준에 따라 텍스트 색상을 변경해주는 확장 프로그램입니다.

## 기능

- 텍스트 파일에서 들여쓰기 수준에 따라 텍스트 색상 변경
- 실시간으로 들여쓰기 색상 업데이트

## 설치

1. [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/)에서 **Text Indent Highlighter**를 검색합니다.
2. 설치 버튼을 클릭하여 확장 프로그램을 설치합니다.

## 설정

설치 후, `settings.json` 파일에 다음 설정을 추가하여 들여쓰기 색상을 사용자 정의할 수 있습니다:

```
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

## 사용 방법

1. Visual Studio Code에서 `.txt` 파일을 엽니다.
2. 들여쓰기를 사용하여 텍스트를 작성하면, 각 들여쓰기 수준에 따라 텍스트 색상이 변경됩니다.

## 기여

기여를 원하시면, [GitHub 저장소](https://github.com/compaq01101/text-indent-highlighter)를 방문하여 풀 리퀘스트를 제출해 주세요.

## 라이선스

이 확장 프로그램은 [Custom License](LICENSE)에 따라 배포됩니다.

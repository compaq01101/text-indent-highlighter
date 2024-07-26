# Changelog

## [0.0.8] - 2024-07-26
### Fixed
- 설정이 업데이트된 후 바로 데코레이션이 적용되지 않던 문제 수정.
- VS Code 재시작 없이 설정 변경 사항이 즉시 반영되도록 수정.

### Improved
- `triggerUpdateDecorations` 함수와 설정 업데이트 로직을 개선하여 사용자 설정을 실시간으로 반영.

### Added
- 설정을 업데이트한 후 즉시 반영되도록 개선.
- `updateColorsSettingAndTriggerUpdate` 함수 추가.

### Fixed
- Fixed issue where decorations were not applied immediately after settings update.
- Fixed issue to reflect setting changes without restarting VS Code.

### Improved
- Improved `triggerUpdateDecorations` function and settings update logic to reflect user settings in real-time.

### Added
- Enhanced to apply settings updates immediately.
- Added `updateColorsSettingAndTriggerUpdate` function.

## [0.0.7] - 2024-07-26
### Added
- 기본 설정을 `settings.json`에 자동으로 추가하는 기능.
- 사용자 설정을 추가하도록 안내 메시지 표시 기능.

### Added
- Added functionality to automatically add default settings to `settings.json`.
- Display an informational message prompting users to add custom settings.

## [0.0.6] - 2024-07-25
### Changed
- `tag`, `categories` 변경.

### Changed
- Updated `tags` and `categories`.

## [0.0.5] - 2024-07-25
### Added
- 실시간으로 들여쓰기 색상을 업데이트하는 기능 추가.

### Changed
- `updateDecorations` 함수 개선.

### Added
- Added functionality to update indentation colors in real-time.

### Changed
- Improved `updateDecorations` function.

## [0.0.3] - 2024-07-25
### Added
- 사용자 설정을 통해 들여쓰기 색상을 지정할 수 있는 기능 추가.

### Added
- Added functionality to specify indentation colors through user settings.

## [0.0.2] - 2024-07-25
### Added
- 초기 버전 배포.
- 기본 들여쓰기 색상 설정.

### Added
- Initial version release.
- Default indentation color settings.

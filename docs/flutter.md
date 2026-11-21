# Using with Flutter

`dist/flutter/bento_theme.dart` is generated from the same tokens as the CSS. It gives you:

- `BentoTheme.light()` and `BentoTheme.dark()`: Material 3 `ThemeData` with the colour scheme, pill-shaped buttons, outlined inputs and the heading font on display, headline and title styles.
- `BentoColors`: all 49 tokens as a `ThemeExtension`, so every colour (including tints, `brand`, `success`, `inverse`) is available in widgets and animates between light and dark.
- `BentoTheme.tile(...)`: the tile `BoxDecoration`, plus `tileRadius`, `tileGap` and `tilePadding` constants.

It passes `flutter analyze` with no warnings.

## Install

```bash
curl -o lib/theme/bento_theme.dart https://raw.githubusercontent.com/SaadNiaziDev/bento-shad-ui/v0.2.0/dist/flutter/bento_theme.dart
```

## Fonts

**Option A, bundled (works offline, recommended for apps).** Download Red Hat Text and Red Hat Display from Google Fonts into `assets/fonts/`, then:

```yaml
# pubspec.yaml
flutter:
  fonts:
    - family: Red Hat Text
      fonts:
        - asset: assets/fonts/RedHatText-Regular.ttf
        - asset: assets/fonts/RedHatText-Medium.ttf
          weight: 500
        - asset: assets/fonts/RedHatText-SemiBold.ttf
          weight: 600
        - asset: assets/fonts/RedHatText-Bold.ttf
          weight: 700
    - family: Red Hat Display
      fonts:
        - asset: assets/fonts/RedHatDisplay-Bold.ttf
          weight: 700
        - asset: assets/fonts/RedHatDisplay-ExtraBold.ttf
          weight: 800
```

The family names match `BentoTheme.fontFamily` and `BentoTheme.headingFontFamily`, so nothing else is needed.

**Option B, google_fonts package.**

```dart
ThemeData withFonts(ThemeData base) {
  final body = GoogleFonts.redHatTextTextTheme(base.textTheme);
  TextStyle? h(TextStyle? s) => GoogleFonts.redHatDisplay(textStyle: s, fontWeight: FontWeight.w700);
  return base.copyWith(
    textTheme: body.copyWith(
      displayLarge: h(body.displayLarge), displayMedium: h(body.displayMedium), displaySmall: h(body.displaySmall),
      headlineLarge: h(body.headlineLarge), headlineMedium: h(body.headlineMedium), headlineSmall: h(body.headlineSmall),
      titleLarge: h(body.titleLarge),
    ),
  );
}

MaterialApp(theme: withFonts(BentoTheme.light()), darkTheme: withFonts(BentoTheme.dark()));
```

## Use

```dart
import 'theme/bento_theme.dart';

MaterialApp(
  theme: BentoTheme.light(),
  darkTheme: BentoTheme.dark(),
  themeMode: ThemeMode.system,
  home: const HomePage(),
);
```

A bento grid with two columns on phones:

```dart
class BentoTile extends StatelessWidget {
  const BentoTile({super.key, required this.child, this.tint, this.onTint});
  final Widget child;
  final Color? tint;
  final Color? onTint;

  @override
  Widget build(BuildContext context) {
    final c = Theme.of(context).extension<BentoColors>()!;
    return Container(
      padding: const EdgeInsets.all(BentoTheme.tilePadding),
      decoration: BentoTheme.tile(c, color: tint),
      child: DefaultTextStyle.merge(style: TextStyle(color: onTint ?? c.cardForeground), child: child),
    );
  }
}

// In a page:
final c = Theme.of(context).extension<BentoColors>()!;
GridView.count(
  crossAxisCount: 2,
  mainAxisSpacing: BentoTheme.tileGap,
  crossAxisSpacing: BentoTheme.tileGap,
  padding: const EdgeInsets.all(16),
  children: [
    BentoTile(tint: c.tintPeach, onTint: c.tintPeachForeground, child: const Text('Budget')),
    BentoTile(tint: c.tintSky, onTint: c.tintSkyForeground, child: const Text('18° Lisbon')),
  ],
);
```

For tiles that span two columns or two rows, use the `flutter_staggered_grid_view` package's `StaggeredGrid.count` with `StaggeredGridTile.count(crossAxisCellCount: 2, mainAxisCellCount: 1, child: …)`.

## Token names

CSS `--tint-peach-foreground` becomes Dart `tintPeachForeground`. The full list is in [theming.md](theming.md).

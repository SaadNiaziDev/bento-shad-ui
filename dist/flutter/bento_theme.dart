// bento-shad-ui v0.2.2 | MIT | https://github.com/SaadNiaziDev/bento-shad-ui
// Generated from tokens.json by scripts/build.mjs. Do not edit by hand.
//
// MaterialApp(theme: BentoTheme.light(), darkTheme: BentoTheme.dark())
// Any token in a widget: Theme.of(context).extension<BentoColors>()!.tintPeach
// Fonts: add "Red Hat Text" and "Red Hat Display" (google_fonts package or font assets).
import 'package:flutter/material.dart';

@immutable
class BentoColors extends ThemeExtension<BentoColors> {
  const BentoColors({
    required this.background,
    required this.foreground,
    required this.card,
    required this.cardForeground,
    required this.popover,
    required this.popoverForeground,
    required this.primary,
    required this.primaryForeground,
    required this.secondary,
    required this.secondaryForeground,
    required this.muted,
    required this.mutedForeground,
    required this.accent,
    required this.accentForeground,
    required this.destructive,
    required this.destructiveForeground,
    required this.border,
    required this.input,
    required this.ring,
    required this.chart1,
    required this.chart2,
    required this.chart3,
    required this.chart4,
    required this.chart5,
    required this.sidebar,
    required this.sidebarForeground,
    required this.sidebarPrimary,
    required this.sidebarPrimaryForeground,
    required this.sidebarAccent,
    required this.sidebarAccentForeground,
    required this.sidebarBorder,
    required this.sidebarRing,
    required this.brand,
    required this.brandForeground,
    required this.success,
    required this.warning,
    required this.info,
    required this.inverse,
    required this.inverseForeground,
    required this.tintPeach,
    required this.tintPeachForeground,
    required this.tintSky,
    required this.tintSkyForeground,
    required this.tintMint,
    required this.tintMintForeground,
    required this.tintLilac,
    required this.tintLilacForeground,
    required this.tintButter,
    required this.tintButterForeground,
  });

  final Color background;
  final Color foreground;
  final Color card;
  final Color cardForeground;
  final Color popover;
  final Color popoverForeground;
  final Color primary;
  final Color primaryForeground;
  final Color secondary;
  final Color secondaryForeground;
  final Color muted;
  final Color mutedForeground;
  final Color accent;
  final Color accentForeground;
  final Color destructive;
  final Color destructiveForeground;
  final Color border;
  final Color input;
  final Color ring;
  final Color chart1;
  final Color chart2;
  final Color chart3;
  final Color chart4;
  final Color chart5;
  final Color sidebar;
  final Color sidebarForeground;
  final Color sidebarPrimary;
  final Color sidebarPrimaryForeground;
  final Color sidebarAccent;
  final Color sidebarAccentForeground;
  final Color sidebarBorder;
  final Color sidebarRing;
  final Color brand;
  final Color brandForeground;
  final Color success;
  final Color warning;
  final Color info;
  final Color inverse;
  final Color inverseForeground;
  final Color tintPeach;
  final Color tintPeachForeground;
  final Color tintSky;
  final Color tintSkyForeground;
  final Color tintMint;
  final Color tintMintForeground;
  final Color tintLilac;
  final Color tintLilacForeground;
  final Color tintButter;
  final Color tintButterForeground;

  static const light = BentoColors(
    background: Color(0xFFF8F8F7),
    foreground: Color(0xFF202124),
    card: Color(0xFFFFFFFF),
    cardForeground: Color(0xFF202124),
    popover: Color(0xFFFFFFFF),
    popoverForeground: Color(0xFF202124),
    primary: Color(0xFF202124),
    primaryForeground: Color(0xFFFFFFFF),
    secondary: Color(0xFFEFEFED),
    secondaryForeground: Color(0xFF202124),
    muted: Color(0xFFF1F1EF),
    mutedForeground: Color(0xFF62635F),
    accent: Color(0xFFECECE8),
    accentForeground: Color(0xFF202124),
    destructive: Color(0xFFB93A24),
    destructiveForeground: Color(0xFFFFFFFF),
    border: Color(0xFFDFDFDA),
    input: Color(0xFF81827B),
    ring: Color(0xFFC24F1D),
    chart1: Color(0xFFFF7A45),
    chart2: Color(0xFF597EAE),
    chart3: Color(0xFF76917A),
    chart4: Color(0xFFB99A60),
    chart5: Color(0xFF8C80AA),
    sidebar: Color(0xFFF3F3F0),
    sidebarForeground: Color(0xFF202124),
    sidebarPrimary: Color(0xFF202124),
    sidebarPrimaryForeground: Color(0xFFFFFFFF),
    sidebarAccent: Color(0xFFEAEAE5),
    sidebarAccentForeground: Color(0xFF202124),
    sidebarBorder: Color(0xFFDFDFDA),
    sidebarRing: Color(0xFFC24F1D),
    brand: Color(0xFFFF7A45),
    brandForeground: Color(0xFF202124),
    success: Color(0xFF1D7A4C),
    warning: Color(0xFF965400),
    info: Color(0xFF2F63C0),
    inverse: Color(0xFF202124),
    inverseForeground: Color(0xFFF8F8F7),
    tintPeach: Color(0xFFF3EAE3),
    tintPeachForeground: Color(0xFF694831),
    tintSky: Color(0xFFE8EEF5),
    tintSkyForeground: Color(0xFF304D70),
    tintMint: Color(0xFFE5EFEA),
    tintMintForeground: Color(0xFF2A5845),
    tintLilac: Color(0xFFEEEBF3),
    tintLilacForeground: Color(0xFF54456C),
    tintButter: Color(0xFFF2EFDF),
    tintButterForeground: Color(0xFF60532A),
  );

  static const dark = BentoColors(
    background: Color(0xFF141416),
    foreground: Color(0xFFF0F0EC),
    card: Color(0xFF1D1D20),
    cardForeground: Color(0xFFF0F0EC),
    popover: Color(0xFF242427),
    popoverForeground: Color(0xFFF0F0EC),
    primary: Color(0xFFF0F0EC),
    primaryForeground: Color(0xFF202124),
    secondary: Color(0xFF2B2B2E),
    secondaryForeground: Color(0xFFF0F0EC),
    muted: Color(0xFF262629),
    mutedForeground: Color(0xFFABABA5),
    accent: Color(0xFF303033),
    accentForeground: Color(0xFFF0F0EC),
    destructive: Color(0xFFFF6B52),
    destructiveForeground: Color(0xFF16161A),
    border: Color(0xFF37373B),
    input: Color(0xFF808087),
    ring: Color(0xFFFF7A45),
    chart1: Color(0xFFFF8A5C),
    chart2: Color(0xFF88A9D0),
    chart3: Color(0xFF93B59A),
    chart4: Color(0xFFCFB17A),
    chart5: Color(0xFFAFA0C9),
    sidebar: Color(0xFF18181A),
    sidebarForeground: Color(0xFFF0F0EC),
    sidebarPrimary: Color(0xFFF0F0EC),
    sidebarPrimaryForeground: Color(0xFF202124),
    sidebarAccent: Color(0xFF2B2B2E),
    sidebarAccentForeground: Color(0xFFF0F0EC),
    sidebarBorder: Color(0xFF37373B),
    sidebarRing: Color(0xFFFF7A45),
    brand: Color(0xFFFF7A45),
    brandForeground: Color(0xFF202124),
    success: Color(0xFF4CC292),
    warning: Color(0xFFF5B94A),
    info: Color(0xFF7AA5FF),
    inverse: Color(0xFFF0F0EC),
    inverseForeground: Color(0xFF202124),
    tintPeach: Color(0xFF302823),
    tintPeachForeground: Color(0xFFE5C6AD),
    tintSky: Color(0xFF202D3B),
    tintSkyForeground: Color(0xFFBDCEE4),
    tintMint: Color(0xFF1D3029),
    tintMintForeground: Color(0xFFB4D6C2),
    tintLilac: Color(0xFF2B2635),
    tintLilacForeground: Color(0xFFD1C6E3),
    tintButter: Color(0xFF302E20),
    tintButterForeground: Color(0xFFDED3A6),
  );

  @override
  BentoColors copyWith({
    Color? background,
    Color? foreground,
    Color? card,
    Color? cardForeground,
    Color? popover,
    Color? popoverForeground,
    Color? primary,
    Color? primaryForeground,
    Color? secondary,
    Color? secondaryForeground,
    Color? muted,
    Color? mutedForeground,
    Color? accent,
    Color? accentForeground,
    Color? destructive,
    Color? destructiveForeground,
    Color? border,
    Color? input,
    Color? ring,
    Color? chart1,
    Color? chart2,
    Color? chart3,
    Color? chart4,
    Color? chart5,
    Color? sidebar,
    Color? sidebarForeground,
    Color? sidebarPrimary,
    Color? sidebarPrimaryForeground,
    Color? sidebarAccent,
    Color? sidebarAccentForeground,
    Color? sidebarBorder,
    Color? sidebarRing,
    Color? brand,
    Color? brandForeground,
    Color? success,
    Color? warning,
    Color? info,
    Color? inverse,
    Color? inverseForeground,
    Color? tintPeach,
    Color? tintPeachForeground,
    Color? tintSky,
    Color? tintSkyForeground,
    Color? tintMint,
    Color? tintMintForeground,
    Color? tintLilac,
    Color? tintLilacForeground,
    Color? tintButter,
    Color? tintButterForeground,
  }) {
    return BentoColors(
      background: background ?? this.background,
      foreground: foreground ?? this.foreground,
      card: card ?? this.card,
      cardForeground: cardForeground ?? this.cardForeground,
      popover: popover ?? this.popover,
      popoverForeground: popoverForeground ?? this.popoverForeground,
      primary: primary ?? this.primary,
      primaryForeground: primaryForeground ?? this.primaryForeground,
      secondary: secondary ?? this.secondary,
      secondaryForeground: secondaryForeground ?? this.secondaryForeground,
      muted: muted ?? this.muted,
      mutedForeground: mutedForeground ?? this.mutedForeground,
      accent: accent ?? this.accent,
      accentForeground: accentForeground ?? this.accentForeground,
      destructive: destructive ?? this.destructive,
      destructiveForeground: destructiveForeground ?? this.destructiveForeground,
      border: border ?? this.border,
      input: input ?? this.input,
      ring: ring ?? this.ring,
      chart1: chart1 ?? this.chart1,
      chart2: chart2 ?? this.chart2,
      chart3: chart3 ?? this.chart3,
      chart4: chart4 ?? this.chart4,
      chart5: chart5 ?? this.chart5,
      sidebar: sidebar ?? this.sidebar,
      sidebarForeground: sidebarForeground ?? this.sidebarForeground,
      sidebarPrimary: sidebarPrimary ?? this.sidebarPrimary,
      sidebarPrimaryForeground: sidebarPrimaryForeground ?? this.sidebarPrimaryForeground,
      sidebarAccent: sidebarAccent ?? this.sidebarAccent,
      sidebarAccentForeground: sidebarAccentForeground ?? this.sidebarAccentForeground,
      sidebarBorder: sidebarBorder ?? this.sidebarBorder,
      sidebarRing: sidebarRing ?? this.sidebarRing,
      brand: brand ?? this.brand,
      brandForeground: brandForeground ?? this.brandForeground,
      success: success ?? this.success,
      warning: warning ?? this.warning,
      info: info ?? this.info,
      inverse: inverse ?? this.inverse,
      inverseForeground: inverseForeground ?? this.inverseForeground,
      tintPeach: tintPeach ?? this.tintPeach,
      tintPeachForeground: tintPeachForeground ?? this.tintPeachForeground,
      tintSky: tintSky ?? this.tintSky,
      tintSkyForeground: tintSkyForeground ?? this.tintSkyForeground,
      tintMint: tintMint ?? this.tintMint,
      tintMintForeground: tintMintForeground ?? this.tintMintForeground,
      tintLilac: tintLilac ?? this.tintLilac,
      tintLilacForeground: tintLilacForeground ?? this.tintLilacForeground,
      tintButter: tintButter ?? this.tintButter,
      tintButterForeground: tintButterForeground ?? this.tintButterForeground,
    );
  }

  @override
  BentoColors lerp(ThemeExtension<BentoColors>? other, double t) {
    if (other is! BentoColors) return this;
    return BentoColors(
      background: Color.lerp(background, other.background, t)!,
      foreground: Color.lerp(foreground, other.foreground, t)!,
      card: Color.lerp(card, other.card, t)!,
      cardForeground: Color.lerp(cardForeground, other.cardForeground, t)!,
      popover: Color.lerp(popover, other.popover, t)!,
      popoverForeground: Color.lerp(popoverForeground, other.popoverForeground, t)!,
      primary: Color.lerp(primary, other.primary, t)!,
      primaryForeground: Color.lerp(primaryForeground, other.primaryForeground, t)!,
      secondary: Color.lerp(secondary, other.secondary, t)!,
      secondaryForeground: Color.lerp(secondaryForeground, other.secondaryForeground, t)!,
      muted: Color.lerp(muted, other.muted, t)!,
      mutedForeground: Color.lerp(mutedForeground, other.mutedForeground, t)!,
      accent: Color.lerp(accent, other.accent, t)!,
      accentForeground: Color.lerp(accentForeground, other.accentForeground, t)!,
      destructive: Color.lerp(destructive, other.destructive, t)!,
      destructiveForeground: Color.lerp(destructiveForeground, other.destructiveForeground, t)!,
      border: Color.lerp(border, other.border, t)!,
      input: Color.lerp(input, other.input, t)!,
      ring: Color.lerp(ring, other.ring, t)!,
      chart1: Color.lerp(chart1, other.chart1, t)!,
      chart2: Color.lerp(chart2, other.chart2, t)!,
      chart3: Color.lerp(chart3, other.chart3, t)!,
      chart4: Color.lerp(chart4, other.chart4, t)!,
      chart5: Color.lerp(chart5, other.chart5, t)!,
      sidebar: Color.lerp(sidebar, other.sidebar, t)!,
      sidebarForeground: Color.lerp(sidebarForeground, other.sidebarForeground, t)!,
      sidebarPrimary: Color.lerp(sidebarPrimary, other.sidebarPrimary, t)!,
      sidebarPrimaryForeground: Color.lerp(sidebarPrimaryForeground, other.sidebarPrimaryForeground, t)!,
      sidebarAccent: Color.lerp(sidebarAccent, other.sidebarAccent, t)!,
      sidebarAccentForeground: Color.lerp(sidebarAccentForeground, other.sidebarAccentForeground, t)!,
      sidebarBorder: Color.lerp(sidebarBorder, other.sidebarBorder, t)!,
      sidebarRing: Color.lerp(sidebarRing, other.sidebarRing, t)!,
      brand: Color.lerp(brand, other.brand, t)!,
      brandForeground: Color.lerp(brandForeground, other.brandForeground, t)!,
      success: Color.lerp(success, other.success, t)!,
      warning: Color.lerp(warning, other.warning, t)!,
      info: Color.lerp(info, other.info, t)!,
      inverse: Color.lerp(inverse, other.inverse, t)!,
      inverseForeground: Color.lerp(inverseForeground, other.inverseForeground, t)!,
      tintPeach: Color.lerp(tintPeach, other.tintPeach, t)!,
      tintPeachForeground: Color.lerp(tintPeachForeground, other.tintPeachForeground, t)!,
      tintSky: Color.lerp(tintSky, other.tintSky, t)!,
      tintSkyForeground: Color.lerp(tintSkyForeground, other.tintSkyForeground, t)!,
      tintMint: Color.lerp(tintMint, other.tintMint, t)!,
      tintMintForeground: Color.lerp(tintMintForeground, other.tintMintForeground, t)!,
      tintLilac: Color.lerp(tintLilac, other.tintLilac, t)!,
      tintLilacForeground: Color.lerp(tintLilacForeground, other.tintLilacForeground, t)!,
      tintButter: Color.lerp(tintButter, other.tintButter, t)!,
      tintButterForeground: Color.lerp(tintButterForeground, other.tintButterForeground, t)!,
    );
  }
}

class BentoTheme {
  BentoTheme._();

  static const String version = '0.2.2';
  static const String fontFamily = 'Red Hat Text';
  static const String headingFontFamily = 'Red Hat Display';
  static const double radius = 12;
  static const double tileRadius = 20;
  static const double tileGap = 12;
  static const double tilePadding = 20;

  static ThemeData light() => _build(BentoColors.light, Brightness.light);
  static ThemeData dark() => _build(BentoColors.dark, Brightness.dark);

  /// A bento tile: card surface, 1px border, large radius. Pass a tint for toned tiles.
  static BoxDecoration tile(BentoColors c, {Color? color}) => BoxDecoration(
        color: color ?? c.card,
        borderRadius: BorderRadius.circular(tileRadius),
        border: color == null ? Border.all(color: c.border) : null,
      );

  static ThemeData _build(BentoColors c, Brightness b) {
    final scheme = ColorScheme(
      brightness: b,
      primary: c.primary,
      onPrimary: c.primaryForeground,
      secondary: c.secondary,
      onSecondary: c.secondaryForeground,
      tertiary: c.brand,
      onTertiary: c.brandForeground,
      error: c.destructive,
      onError: c.destructiveForeground,
      surface: c.card,
      onSurface: c.cardForeground,
      surfaceContainerHighest: c.muted,
      onSurfaceVariant: c.mutedForeground,
      outline: c.input,
      outlineVariant: c.border,
    );
    final field = OutlineInputBorder(
      borderRadius: BorderRadius.circular(radius * 0.8),
      borderSide: BorderSide(color: c.input),
    );
    final base = ThemeData(
      useMaterial3: true,
      brightness: b,
      colorScheme: scheme,
      scaffoldBackgroundColor: c.background,
      fontFamily: fontFamily,
      dividerColor: c.border,
      extensions: [c],
      filledButtonTheme: FilledButtonThemeData(
        style: FilledButton.styleFrom(
          shape: const StadiumBorder(),
          minimumSize: const Size(0, 40),
          textStyle: const TextStyle(fontWeight: FontWeight.w600),
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          shape: const StadiumBorder(),
          minimumSize: const Size(0, 40),
          side: BorderSide(color: c.border),
          foregroundColor: c.foreground,
        ),
      ),
      textButtonTheme: TextButtonThemeData(
        style: TextButton.styleFrom(shape: const StadiumBorder(), foregroundColor: c.foreground),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: c.card,
        border: field,
        enabledBorder: field,
        focusedBorder: field.copyWith(borderSide: BorderSide(color: c.ring, width: 2)),
        errorBorder: field.copyWith(borderSide: BorderSide(color: c.destructive)),
      ),
    );
    TextStyle? heading(TextStyle? s) => s?.copyWith(fontFamily: headingFontFamily, fontWeight: FontWeight.w700);
    final t = base.textTheme;
    return base.copyWith(
      textTheme: t.copyWith(
        displayLarge: heading(t.displayLarge),
        displayMedium: heading(t.displayMedium),
        displaySmall: heading(t.displaySmall),
        headlineLarge: heading(t.headlineLarge),
        headlineMedium: heading(t.headlineMedium),
        headlineSmall: heading(t.headlineSmall),
        titleLarge: heading(t.titleLarge),
      ),
    );
  }
}

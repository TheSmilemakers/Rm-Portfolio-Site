import '@once-ui-system/core/css/styles.css';
import '@once-ui-system/core/css/tokens.css';
import '@/resources/custom.css'

import classNames from "classnames";

import { Background, Column, Flex, Meta, opacity, SpacingToken, Particle } from "@once-ui-system/core";
import { Footer, Header, RouteGuard, Providers } from '@/components';
import { baseURL, effects, fonts, style, dataStyle, home } from '@/resources';

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex
      suppressHydrationWarning
      as="html"
      lang="en"
      fillWidth
      data-scroll-behavior="smooth"
      className={classNames(
        fonts.heading.variable,
        fonts.body.variable,
        fonts.label.variable,
        fonts.code.variable,
      )}
    >
      <head>
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const root = document.documentElement;
                  const defaultTheme = '${style.theme}';
                  
                  // Set defaults from config
                  const config = ${JSON.stringify({
                    brand: style.brand,
                    accent: style.accent,
                    neutral: style.neutral,
                    solid: style.solid,
                    'solid-style': style.solidStyle,
                    border: style.border,
                    surface: style.surface,
                    transition: style.transition,
                    scaling: style.scaling,
                    'viz-style': dataStyle.variant,
                  })};
                  
                  // Apply default values
                  Object.entries(config).forEach(([key, value]) => {
                    root.setAttribute('data-' + key, value);
                  });
                  
                  // Resolve theme
                  const resolveTheme = (themeValue) => {
                    if (!themeValue || themeValue === 'system') {
                      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                    }
                    return themeValue;
                  };
                  
                  // Apply saved theme or use default
                  const savedTheme = localStorage.getItem('data-theme');
                  const resolvedTheme = resolveTheme(savedTheme || defaultTheme);
                  root.setAttribute('data-theme', resolvedTheme);
                  
                  // Apply any saved style overrides
                  const styleKeys = Object.keys(config);
                  styleKeys.forEach(key => {
                    const value = localStorage.getItem('data-' + key);
                    if (value) {
                      root.setAttribute('data-' + key, value);
                    }
                  });
                } catch (e) {
                  console.error('Failed to initialize theme:', e);
                  document.documentElement.setAttribute('data-theme', '${style.theme}');
                }
              })();
            `,
          }}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />
      </head>
      <Providers>
        <Column as="body" background="page" fillWidth style={{minHeight: "100vh", height: "100%", position: "relative"}} margin="0" padding="0">
          {/* Type-safe effects for Background component - absolute positioning with full height */}
          <div style={{position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 0}}>
            {(() => {
              const typedEffects = {
                gradient: { ...effects.gradient, opacity: effects.gradient.opacity as 100 },
                dots: { ...effects.dots, opacity: effects.dots.opacity as 40, size: effects.dots.size as SpacingToken },
                grid: { ...effects.grid, opacity: effects.grid.opacity as 100 },
                lines: { ...effects.lines, opacity: effects.lines.opacity as 100, size: effects.lines.size as SpacingToken },
                mask: effects.mask
              };
              
              return (
                <>
                  <Background
                    gradient={typedEffects.gradient}
                    dots={typedEffects.dots}
                    grid={typedEffects.grid}
                    lines={typedEffects.lines}
                    mask={typedEffects.mask}
                    data-viz-style={dataStyle.variant}
                    data-viz-color-mode={dataStyle.mode}
                  />
                </>
              );
            })()}
          </div>
          
          {/* Content layer */}
          <Column fillWidth style={{minHeight: "100vh", position: "relative", zIndex: 1}}>
            <RouteGuard>
              <Column fillWidth>
                <Header />
                <Column
                  as="main"
                  fillWidth
                  horizontal="center"
                  style={{ flexGrow: 1 }}
                >
                  {children}
                </Column>
                <Footer />
              </Column>
            </RouteGuard>
          </Column>
        </Column>
      </Providers>
    </Flex>
  );
}
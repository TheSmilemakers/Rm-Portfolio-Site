'use client';

import { useState, useRef, useEffect } from 'react';
import { Column, Flex, Text, Button, Spinner, Heading, RevealFx } from '@once-ui-system/core';
import { GameFrameProps, GameState } from '@/types/game';
import styles from './GameFrame.module.scss';

const defaultConfig = {
  src: '/games/galactic-hustle/index.html',
  title: 'Galactic Hustle',
  maxWidth: '1200px',
  minHeight: typeof window !== 'undefined' && window.innerWidth < 768 ? '400px' : '800px',
  loading: 'eager' as const,
};

export const GameFrame: React.FC<GameFrameProps> = ({ 
  config = {}, 
  onLoad, 
  onError 
}) => {
  const gameConfig = { ...defaultConfig, ...config };
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [showStoryline, setShowStoryline] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameState, setGameState] = useState<GameState>({
    isLoading: true,
    hasError: false,
  });

  const handleLoad = () => {
    setGameState({ isLoading: false, hasError: false });
    onLoad?.();
  };

  const handleError = () => {
    const error = new Error('Failed to load game');
    setGameState({ 
      isLoading: false, 
      hasError: true, 
      errorMessage: 'Unable to load the game. Please try again.' 
    });
    onError?.(error);
  };

  const handleFullscreen = () => {
    if (iframeRef.current && iframeRef.current.requestFullscreen) {
      iframeRef.current.requestFullscreen();
    }
  };

  const handleStartGame = () => {
    setShowStoryline(false);
    setGameStarted(true);
  };

  useEffect(() => {
    // Add cyberpunk glow effect when game loads
    if (!gameState.isLoading && !gameState.hasError && gameStarted) {
      iframeRef.current?.classList.add(styles.loaded);
    }
  }, [gameState, gameStarted]);

  if (showStoryline) {
    return (
      <Column 
        fillWidth 
        align="center" 
        className={styles.gameContainer}
        style={{ maxWidth: gameConfig.maxWidth }}
      >
        <Flex
          fillWidth
          padding="xl"
          radius="l"
          border="neutral-alpha-weak"
          direction="column"
          className={styles.storylineCard}
          background="surface"
          align="center"
          style={{ minHeight: gameConfig.minHeight }}
        >
          <Column maxWidth="m" gap="l" align="center">
            <RevealFx>
              <Text 
                variant="label-default-m" 
                onBackground="brand-medium"
                className={styles.year}
              >
                YEAR 2157
              </Text>
            </RevealFx>
            
            <RevealFx delay={0.1}>
              <Text 
                variant="label-default-s" 
                onBackground="accent-medium"
                className={styles.sector}
              >
                SECTOR: OUTER RIM
              </Text>
            </RevealFx>

            <Column gap="m" align="center" paddingY="l">
              <RevealFx delay={0.2}>
                <Text 
                  variant="body-default-l" 
                  onBackground="neutral-strong"
                  align="center"
                  className={styles.storyText}
                >
                  You&apos;ve inherited a small cargo ship from your uncle, 
                  a legendary trader who vanished near the Zorath system.
                </Text>
              </RevealFx>

              <RevealFx delay={0.3}>
                <Text 
                  variant="body-default-l" 
                  onBackground="neutral-strong"
                  align="center"
                  className={styles.storyText}
                >
                  With only 1000 credits and dreams of building a 
                  trading empire, you set course for Terra Prime.
                </Text>
              </RevealFx>

              <RevealFx delay={0.4}>
                <Text 
                  variant="body-default-l" 
                  onBackground="neutral-strong"
                  align="center"
                  className={styles.storyText}
                >
                  The galaxy is yours to conquer. Buy low, sell high, 
                  and watch out for pirates in the void.
                </Text>
              </RevealFx>

              <RevealFx delay={0.5}>
                <Text 
                  variant="body-default-l" 
                  onBackground="brand-weak"
                  align="center"
                  weight="strong"
                  className={styles.missionText}
                >
                  Your mission: Turn your humble inheritance into 
                  a fortune within 30 days.
                </Text>
              </RevealFx>
            </Column>

            <RevealFx delay={0.6}>
              <Button
                label="Let's Go"
                size="l"
                variant="primary"
                onClick={handleStartGame}
                className={styles.startButton}
                suffixIcon="arrowRight"
              />
            </RevealFx>
          </Column>
        </Flex>
      </Column>
    );
  }

  return (
    <Column 
      fillWidth 
      align="center" 
      className={styles.gameContainer}
      style={{ maxWidth: gameConfig.maxWidth }}
    >
      <Flex
        fillWidth
        padding="0"
        radius="l"
        border="neutral-alpha-weak"
        direction="column"
        className={styles.gameCard}
        data-game-theme="cyberpunk"
        background="surface"
      >
        {gameState.isLoading && (
          <Flex 
            fillWidth 
            align="center" 
            style={{ minHeight: gameConfig.minHeight }}
            className={styles.loadingContainer}
          >
            <Column align="center" gap="m">
              <Spinner size="l" />
              <Text variant="body-default-m" onBackground="neutral-weak">
                Initializing quantum drives...
              </Text>
            </Column>
          </Flex>
        )}

        {gameState.hasError && (
          <Flex 
            fillWidth 
            align="center" 
            style={{ minHeight: '400px' }}
          >
            <Column align="center" gap="m">
              <Text variant="heading-strong-m" onBackground="danger-weak">
                Game Loading Failed
              </Text>
              <Text variant="body-default-m" onBackground="neutral-weak">
                {gameState.errorMessage}
              </Text>
              <Button
                label="Retry"
                variant="primary"
                onClick={() => window.location.reload()}
              />
            </Column>
          </Flex>
        )}

        <div className={styles.gameWrapper}>
          {gameStarted && (
            <iframe
              ref={iframeRef}
              src={gameConfig.src}
              title={gameConfig.title}
              loading={gameConfig.loading}
              onLoad={handleLoad}
              onError={handleError}
              className={styles.gameIframe}
              style={{ 
                minHeight: gameConfig.minHeight,
                display: gameState.isLoading ? 'none' : 'block'
              }}
              allow="fullscreen"
            />
          )}
          
          {!gameState.isLoading && !gameState.hasError && (
            <Flex className={styles.gameControls} padding="s" gap="s">
              <Button
                label="Fullscreen"
                size="m"
                variant="tertiary"
                prefixIcon="expand"
                onClick={handleFullscreen}
                style={{ minWidth: '48px', minHeight: '48px' }}
              />
            </Flex>
          )}
        </div>
      </Flex>
    </Column>
  );
};
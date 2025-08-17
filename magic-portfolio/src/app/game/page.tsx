import { Metadata } from 'next';
import { Column, RevealFx, Heading, Text, Fade, Row } from '@once-ui-system/core';
import { GameFrame } from '@/components/game/GameFrame';
import { game, baseURL } from '@/resources';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: game.title,
    description: game.description,
    openGraph: {
      title: game.title,
      description: game.description,
      url: `${baseURL}${game.path}`,
      images: [{
        url: `${baseURL}/api/og/generate?title=${encodeURIComponent('Galactic Hustle')}&description=${encodeURIComponent('Space Trading Game')}`,
        width: 1200,
        height: 630,
        alt: game.title,
      }],
    },
  };
}

export default function GamePage() {
  return (
    <Column fillWidth align="center" padding="xl" gap="l" paddingBottom="104">
      <Fade>
        <Column maxWidth="xl" gap="m" align="center" paddingBottom="l">
          <RevealFx>
            <Heading variant="display-strong-xl" align="center">
              Galactic Hustle
            </Heading>
          </RevealFx>
          <RevealFx delay={0.1}>
            <Text variant="body-default-l" onBackground="neutral-weak" align="center">
              Navigate the cosmos as a space trader. Buy low, sell high, and build your empire.
            </Text>
          </RevealFx>
          <RevealFx delay={0.2}>
            <Row gap="m" align="center">
              <Text variant="label-default-s" onBackground="neutral-weak">
                🎮 Strategy Game
              </Text>
              <Text variant="label-default-s" onBackground="neutral-weak">
                •
              </Text>
              <Text variant="label-default-s" onBackground="neutral-weak">
                🚀 30-Day Missions
              </Text>
              <Text variant="label-default-s" onBackground="neutral-weak">
                •
              </Text>
              <Text variant="label-default-s" onBackground="neutral-weak">
                💰 Trading Simulation
              </Text>
            </Row>
          </RevealFx>
        </Column>
      </Fade>
      
      <Fade delay={0.3}>
        <GameFrame />
      </Fade>
    </Column>
  );
}
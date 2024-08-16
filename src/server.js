require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-react'],
});

const { generateUsername } = require('unique-username-generator');
const colors = require('nice-color-palettes/200');

const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const styled = require('styled-components').default;
const Avatar = require('./lib').default;

const app = express();
const PORT = process.env.PORT || 3000;

const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AvatarComponent = ({ name, playgroundColors, size, square, variant }) => (
  <AvatarContainer>
    <Avatar name={name} colors={playgroundColors} size={size} variant={variant} square={square} />
  </AvatarContainer>
);

app.get('/avatar', (req, res) => {
  const customPalette = colors[Math.floor(Math.random() * colors.length)];
  const variants = ['beam', 'bauhaus', 'ring'];
  const getRandomVariant = () => variants[Math.floor(Math.random() * variants.length)];
  const randomVariant = getRandomVariant();
  const avatarName = generateUsername();
  const avatarSize = 128;
  const isSquare = true;

  const avatarElement = React.createElement(AvatarComponent, {
    name: avatarName,
    playgroundColors: customPalette,
    size: avatarSize,
    square: isSquare,
    variant: randomVariant,
  });

  const avatarHtml = ReactDOMServer.renderToString(avatarElement);

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>wolnet random avatar</title>
    </head>
    <body>
      ${avatarHtml}
    </body>
    </html>
  `);
});

// Uruchomienie serwera
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});

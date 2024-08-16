const express = require('express');
const serverless = require('serverless-http');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const styled = require('styled-components').default;

const app = express();

const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AvatarComponent = ({ name, playgroundColors, size, square, variant, Avatar }) => (
  <AvatarContainer>
    <Avatar name={name} colors={playgroundColors} size={size} variant={variant} square={square} />
  </AvatarContainer>
);

app.get('/avatar', async (req, res) => {
  const { generateUsername } = await import('unique-username-generator');
  const colors = (await import('nice-color-palettes/200')).default;
  const { default: Avatar } = await import('./lib/components/Avatar');

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
    Avatar: Avatar,
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports.handler = serverless(app);

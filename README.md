# AvatarHowler

🍣 REST API that generates SVG/PNG avatars using the [boring-avatars](https://github.com/boringdesigners/boring-avatars) library.

## Query Param Types

```typescript
type Query = {
	size?: int; // Default: 80(px)
	variant?: "beam" | "pixel" | "bauhaus";
};
```

## Usage/Examples

```shell
curl wolfnet-avatars.vercel.app/api/avatar?size=40&variant=beam
```

## Issues

If you enountered an issue, please open new one on [GitHub](https://github.com/lycahn/avatar-howler/issues).

Issues and bugs are more than welcome, as they help to improve the plugin.

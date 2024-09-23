# AvatarHowler

🍣 REST API that generates SVG/PNG avatars using the [boring-avatars](https://github.com/boringdesigners/boring-avatars) library.

## Query Param Types

```typescript
type Query = {
	size?: int; // Default: 80(px)
	variant?: "marble" | "beam" | "pixel" | "sunset" | "ring" | "bauhaus";
};
```

## Usage/Examples

```shell
curl wolfnet-avatars.vercel.app/api/avatar?size=40&variant=marble
```

## Issues

If you enountered an issue, please open new one on [GitHub](https://github.com/lycahn/howlgen/issues).

Issues and bugs are more than welcome, as they help to improve the plugin.

## Meta

[CONTRIBUTING](/.github/CONTRIBUTING.md)

[LICENSE (MIT)](https://github.com/lycahn/howlgen?tab=MIT-1-ov-file)

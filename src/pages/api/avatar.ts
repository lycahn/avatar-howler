import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import Avatar, { AvatarProps } from "boring-avatars";
import * as uuid from "uuid";
import * as yup from "yup";
import colors from "nice-color-palettes";
import sharp from "sharp";

const variants = ["beam", "pixel", "bauhaus"];
const imageStore: { [key: string]: Buffer } = {};

const querySchema = yup.object().shape({
	variant: yup.string().oneOf(variants).optional(),
	name: yup.string().optional(),
	size: yup.number().integer().optional(),
});

type GetRequest = NextApiRequest & {
	query: {
		variant?: AvatarProps["variant"];
		colors?: AvatarProps["colors"];
		size?: number;
		name?: string;
	};
};

export default nextConnect<NextApiRequest, NextApiResponse>().get(
	async (req: GetRequest, res) => {
		try {
			await querySchema.validate(req.query);

			type VariantType = "beam" | "pixel" | "bauhaus";

			const isValidVariant = (variant: any): variant is VariantType => {
				return ["beam", "pixel", "bauhaus"].includes(variant);
			};

			const variant: any =
				req.query.variant ||
				variants[Math.floor(Math.random() * variants.length)];

			if (!isValidVariant(variant)) {
				throw new Error(`Invalid variant type: ${variant}`);
			}

			const randomColors = colors[Math.floor(Math.random() * colors.length)];

			const el = createElement(Avatar, {
				name: Buffer.from(uuid.v4()).toString("base64"),
				size: 80,
				variant,
				square: true,
				colors: randomColors,
				...req.query,
			});
			const svg = renderToStaticMarkup(el);

			// Convert SVG to PNG
			const imageBuffer = await sharp(Buffer.from(svg)).png().toBuffer();

			const id = uuid.v4();
			imageStore[id] = imageBuffer;

			try {
				res.setHeader("Content-Type", "image/png");
				res.setHeader("Access-Control-Allow-Origin", "*");
				res.end(imageBuffer);
			} catch (err) {
				res.status(400).send({ error: err.toString() });
			}
			return;
		} catch (err) {
			res.status(400).send({ error: err.toString() });
		}
		return;
	}
);

export const getImageById = nextConnect<NextApiRequest, NextApiResponse>().get(
	(req, res) => {
		const { id } = req.query;
		const image = imageStore[id as string];
		if (image) {
			res.setHeader("Content-Type", "image/png");
			res.setHeader("Access-Control-Allow-Origin", "*");
			res.end(image);
		} else {
			res.status(404).send({ error: "Not found" });
		}
	}
);

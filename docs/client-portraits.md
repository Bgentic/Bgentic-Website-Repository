# Client gallery portraits

The home page's client gallery (section 05) shows each client's real website on a monitor, a tablet and a phone,
inside a lit studio. Each card can also show a person standing beside the devices. The person is a drop-in, and the
card looks finished without one.

## Adding a portrait

1. Make the image: a photo, or an AI image from the prompts below.
2. Remove the background so it's a cut-out with a transparent background.
3. Crop it so the person fills the height and the bottom edge falls at the waist or hips.
4. Save it as `public/images/clients/<slug>/person.webp`. PNG or AVIF also work.
5. Run `npm run build`. In `npm run dev` it shows on the next reload.

The devices move left to make room automatically.

| Client | Folder |
|---|---|
| NPP Traffic Solutions | `public/images/clients/npp-traffic-solutions/` |
| Sydney Pink Slips | `public/images/clients/sydney-pink-slips/` |
| We Are Art | `public/images/clients/we-are-art/` |
| Sventy8 Events | `public/images/clients/sventy8-events/` |

**Size:** about 1000 × 1400 px or larger, under 400 KB as WebP.

**Facing and light:** the person should face slightly to the left, toward the devices, with light from the upper left
to match the studio.

## Real photos first

A real photo of the owner or team, sent by the client and approved by them, is always the better choice. It is true,
and the site's rule is that every fact on the page is true today.

An AI portrait beside a real client's name can be read as that client's actual staff. If AI portraits are used, keep
them generic to the trade, as below, and check with each client before launch.

## Prompts

Start each prompt with the same base:

> Photorealistic studio portrait, waist-up, standing, body turned three-quarters toward the left of frame, looking at
> the camera with a relaxed, confident half-smile. Soft key light from the upper left, a gentle rim light from the
> right, plain light-grey seamless background for an easy cut-out. 85mm lens look, natural skin texture, true-to-life
> colour. No logos, no text, no jewellery that catches the light. Vertical 4:5, at least 1600px tall.

Then add the person for each card:

- **NPP Traffic Solutions:** a traffic controller in his 40s, short dark hair and a trimmed beard. He wears a hi-vis
  yellow long-sleeve work shirt with reflective tape, sleeves pushed up, and holds a white hard hat at his side.
- **Sydney Pink Slips:** a mobile vehicle inspector in her 30s, hair tied back. She wears a plain dark navy work polo
  and holds a tablet against her chest, screen facing away.
- **We Are Art:** a sound engineer in his late 20s, wearing a plain black t-shirt, with over-ear studio headphones
  resting around his neck and his arms relaxed.
- **Sventy8 Events:** an events producer in her late 20s with curly hair. She wears a black overshirt over a white
  tee and holds a phone loosely in one hand.

Vary age, gender and background across the four, so the set reads as Sydney rather than one stock face.

## Refreshing the screenshots

The device screens are screenshots of each client's live site. Retake them whenever a site changes:

```
npm run shots:clients               # all four (needs Microsoft Edge)
npm run shots:clients -- sventy8    # just one
```

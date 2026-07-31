import React, { useState } from "react"
import {
  ArtnetAutocompleteInput,
  ArtnetButton,
  Box,
  Clickable,
  Column,
  GridColumns,
  Link,
  Select,
  Separator,
  Text,
} from "../artnet-elements"
import { Theme } from "../Theme"

const ARTIST_OPTIONS = [
  "Pablo Picasso",
  "Gerhard Richter",
  "Yayoi Kusama",
  "Andy Warhol",
  "Jean-Michel Basquiat",
  "Banksy",
]

export default {
  title: "Theme/Artnet",
}

type Tab = "fineArt" | "decorativeArt"

interface MockResult {
  artist: string
  title: string
  medium: string
  objectType: string
  dimensions: string
  saleDate: string
  auctionHouse: string
  lotInfo: string
  estimate: string
}

const RESULTS_BY_TAB: Record<Tab, MockResult[]> = {
  fineArt: [
    {
      artist: "After Pablo Picasso",
      title: "Cubist Linocuts",
      medium: "linocuts",
      objectType: "Print",
      dimensions: "Height 26.7 x Width 31.8 cm",
      saleDate: "28 August 2026",
      auctionHouse: "Thomaston Place Auction Galleries",
      lotInfo: "SUMMER GRANDEUR 2026 – [Lot 01150]",
      estimate: "est. 500 - 700 USD",
    },
    {
      artist: "Gerhard Richter",
      title: "Abstraktes Bild",
      medium: "oil on canvas",
      objectType: "Painting",
      dimensions: "Height 100 x Width 140 cm",
      saleDate: "14 September 2026",
      auctionHouse: "Ketterer Kunst",
      lotInfo: "MODERN ART EVENING SALE – [Lot 0212]",
      estimate: "est. 800,000 - 1,200,000 EUR",
    },
    {
      artist: "Yayoi Kusama",
      title: "Pumpkin (L)",
      medium: "acrylic on canvas",
      objectType: "Painting",
      dimensions: "Height 45.5 x Width 38 cm",
      saleDate: "2 October 2026",
      auctionHouse: "Bonhams",
      lotInfo: "CONTEMPORARY ART SALE – [Lot 0087]",
      estimate: "est. 300,000 - 500,000 GBP",
    },
  ],
  decorativeArt: [
    {
      artist: "Tiffany Studios",
      title: "Dragonfly Table Lamp",
      medium: "leaded glass and bronze",
      objectType: "Lighting",
      dimensions: "Height 66 cm",
      saleDate: "10 September 2026",
      auctionHouse: "Rago Arts",
      lotInfo: "DESIGN SALE – [Lot 0044]",
      estimate: "est. 60,000 - 90,000 USD",
    },
    {
      artist: "Meissen Porcelain Manufactory",
      title: "Harlequin Figurine",
      medium: "hand-painted porcelain",
      objectType: "Sculpture",
      dimensions: "Height 18 cm",
      saleDate: "22 September 2026",
      auctionHouse: "Bonhams",
      lotInfo: "EUROPEAN CERAMICS – [Lot 0021]",
      estimate: "est. 4,000 - 6,000 GBP",
    },
  ],
}

const OBJECT_TYPE_OPTIONS = [
  { text: "All Object Types", value: "" },
  { text: "Painting", value: "Painting" },
  { text: "Print", value: "Print" },
  { text: "Sculpture", value: "Sculpture" },
  { text: "Lighting", value: "Lighting" },
]

/**
 * A mock artnet Price Database results page, composed entirely from
 * existing palette elements under the artnet_light theme — colors, type
 * scale, and fonts sourced from artnet.com and the real Price Database
 * (see packages/palette-tokens/src/themes/artnetLight.tsx). Filtering runs
 * against the dummy RESULTS_BY_TAB dict above — there's no real search.
 *
 * Sharp corners are deliberate: no `borderRadius` is set anywhere below,
 * since Box has no default radius. Input/Button/Select carry their own
 * hardcoded non-zero radius baked into their own CSS — a known, called-out
 * exception until the theme-radii follow-up lands.
 */
export const PriceDatabase = () => {
  const [tab, setTab] = useState<Tab>("fineArt")
  const [artistQuery, setArtistQuery] = useState("")
  const [objectType, setObjectType] = useState("")
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = () => setHasSearched(true)

  const results = RESULTS_BY_TAB[tab].filter((result) => {
    const matchesArtist =
      artistQuery.trim().length === 0 ||
      result.artist.toLowerCase().includes(artistQuery.trim().toLowerCase())
    const matchesObjectType = !objectType || result.objectType === objectType
    return matchesArtist && matchesObjectType
  })

  return (
    <Theme theme="artnet_light">
      <Box bg="mono0">
        <Box bg="mono100" px={4} py={2}>
          <GridColumns alignItems="center">
            <Column span={6}>
              <Text variant="lg-display" color="mono0">
                artnet
              </Text>
            </Column>

            <Column span={6} display="flex" justifyContent="flex-end">
              <Text variant="sm" color="mono0" mr={4}>
                Artworks
              </Text>
              <Text variant="sm" color="mono0" mr={4}>
                Galleries
              </Text>
              <Text variant="sm" color="mono0">
                Price Database
              </Text>
            </Column>
          </GridColumns>
        </Box>

        <Box px={4} py={2} borderBottom="1px solid" borderColor="mono10">
          <Text variant="xs" color="mono60">
            Price Database
          </Text>
        </Box>

        <Box px={4} py={6}>
          <Text variant="lg" color="mono100">
            Search
          </Text>

          <Box display="flex" mt={4}>
            <Clickable onClick={() => setTab("fineArt")} mr={4} pb={1}>
              <Box
                borderBottom={tab === "fineArt" ? "2px solid" : undefined}
                borderColor="mono100"
              >
                <Text
                  variant="sm"
                  color={tab === "fineArt" ? "mono100" : "mono60"}
                >
                  Fine Art
                </Text>
              </Box>
            </Clickable>

            <Clickable onClick={() => setTab("decorativeArt")} pb={1}>
              <Box
                borderBottom={tab === "decorativeArt" ? "2px solid" : undefined}
                borderColor="mono100"
              >
                <Text
                  variant="sm"
                  color={tab === "decorativeArt" ? "mono100" : "mono60"}
                >
                  Decorative Art
                </Text>
              </Box>
            </Clickable>
          </Box>

          <GridColumns mt={6} alignItems="end">
            <Column span={4}>
              <ArtnetAutocompleteInput
                title="Artist"
                placeholder="e.g. Picasso"
                value={artistQuery}
                onChange={setArtistQuery}
                options={ARTIST_OPTIONS}
                onKeyDown={(event) => {
                  if (event.key === "Enter") handleSearch()
                }}
              />
            </Column>

            <Column span={4}>
              <Select
                title="Object Type"
                options={OBJECT_TYPE_OPTIONS}
                selected={objectType}
                onSelect={setObjectType}
              />
            </Column>

            <Column span={4} display="flex" alignItems="flex-end">
              <ArtnetButton
                variant="primaryBlack"
                width="100%"
                onClick={handleSearch}
              >
                Search
              </ArtnetButton>
            </Column>
          </GridColumns>
        </Box>

        <Separator color="mono10" />

        {!hasSearched ? (
          <Box px={4} py={2}>
            <Text variant="sm" color="mono100">
              0 Results
            </Text>
          </Box>
        ) : (
          <>
            <Box px={4} py={2}>
              <Text variant="sm" color="mono100">
                Showing {results.length ? 1 : 0} - {results.length} of{" "}
                {results.length}
              </Text>
            </Box>

            {results.length === 0 && (
              <Box px={4} py={6}>
                <Text variant="sm" color="mono60">
                  No results found.
                </Text>
              </Box>
            )}

            {results.map((result) => (
              <Box key={result.title} bg="mono5" px={4} py={6}>
                <GridColumns>
                  <Column span={2}>
                    <Box width="100%" height={80} bg="mono10" />
                  </Column>

                  <Column span={6}>
                    <Text variant="sm" color="mono100" fontWeight="bold">
                      {result.artist}
                    </Text>
                    <Text
                      variant="sm"
                      color="mono100"
                      style={{ fontStyle: "italic" }}
                    >
                      {result.title}
                    </Text>
                    <Text variant="xs" color="mono60">
                      {result.medium}
                    </Text>
                    <Text variant="xs" color="mono60">
                      {result.dimensions}
                    </Text>
                  </Column>

                  <Column span={4}>
                    <Text variant="sm" color="mono100" fontWeight="bold">
                      {result.saleDate}
                    </Text>
                    <Text variant="sm" color="mono100">
                      {result.auctionHouse}
                    </Text>
                    <Text
                      variant="xs"
                      color="mono60"
                      style={{ fontStyle: "italic" }}
                    >
                      {result.lotInfo}
                    </Text>
                    <Text variant="xs" color="mono60">
                      {result.estimate}
                    </Text>
                  </Column>
                </GridColumns>
              </Box>
            ))}

            {results.length > 0 && (
              <Box px={4} py={6}>
                <Text variant="lg-display" color="mono100">
                  Your Insights
                </Text>
                <Text variant="xs" color="mono60" mb={4}>
                  {artistQuery ? `All "${artistQuery}"` : "All Results"} |{" "}
                  {tab === "fineArt" ? "Fine Art" : "Decorative Art"}
                </Text>

                <GridColumns>
                  <Column span={6}>
                    <Box as="span" bg="blue15" px={1}>
                      <Text as="span" variant="xs" color="mono100">
                        Sold Above High Estimate
                      </Text>
                    </Box>
                    <Text variant="xl" color="mono100">
                      46%
                    </Text>
                  </Column>

                  <Column span={6}>
                    <Box as="span" bg="blue15" px={1}>
                      <Text as="span" variant="xs" color="mono100">
                        Upcoming Lots
                      </Text>
                    </Box>
                    <Text variant="xl" color="mono100">
                      {results.length}
                    </Text>
                  </Column>
                </GridColumns>
              </Box>
            )}

            <Separator color="mono10" />

            <Box px={4} py={2}>
              <Text variant="sm" color="mono100">
                <Link href="#">Show Next 100</Link> &nbsp;|&nbsp; 1 of 1,063
              </Text>
            </Box>
          </>
        )}
      </Box>
    </Theme>
  )
}

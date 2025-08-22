import { fn } from "@storybook/test"
import React from "react"
import { States } from "storybook-states"
import {
  ModalDialogContent,
  ModalDialogContentProps,
} from "./ModalDialogContent"
import { Text } from "../Text"
import { Button } from "../Button"
import { Input } from "../Input"
import { Join } from "../Join"
import { Spacer } from "../Spacer"
import { Box } from "../Box"
import ChevronLeftIcon from "@artsy/icons/ChevronLeftIcon"
import ArtsyLogoIcon from "@artsy/icons/ArtsyLogoIcon"
import CloseIcon from "@artsy/icons/CloseIcon"

export default {
  component: ModalDialogContent,
  title: "Components/ModalDialogContent",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Content component for modal dialogs with title, body, and action sections.",
      },
    },
    controls: {
      include: ["title", "onBack", "onClose", "children"],
    },
  },
}

const EXAMPLE_LONG_NAME =
  "Egypt, Thebes, Wadi Qubbanet el-Qirud, New Kingdom, Late Dynasty 18 or early Dynasty 19"

export const Default = {
  render: () => (
    <States<Partial<ModalDialogContentProps>>
      states={[
        {
          children: (
            <Text variant="sm" bg="mono10">
              Content shorter than width
            </Text>
          ),
        },
        {
          children: (
            <Text variant="sm">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque,
              neque voluptates! Sapiente, sint magnam. Assumenda, hic eius
              asperiores iure explicabo itaque accusantium, consectetur aut sit
              maxime culpa ab aliquid consequatur?
            </Text>
          ),
        },
        { title: "Modal Title" },
        {
          title:
            "Modal Title with a longer title or headline text that runs on for mutliple lines",
        },
        { title: "Pneumonoultramicroscopicsilicovolcanoconiosis" },
        {
          title: `Sign up to discover new works by ${EXAMPLE_LONG_NAME} and more artists you love`,
        },
        { hasLogo: true },
        { title: "Modal Title", hasLogo: true },
        {
          children: (
            <Text variant="sm">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque,
              neque voluptates! Sapiente, sint magnam. Assumenda, hic eius
              asperiores iure explicabo itaque accusantium, consectetur aut sit
              maxime culpa ab aliquid consequatur?
            </Text>
          ),
          footer: <Button width="100%">Confirm</Button>,
        },
        { title: "Modal Title", footer: <Button width="100%">Confirm</Button> },
        {
          title:
            "Modal Title with a longer title or headline text that runs on for mutliple lines",
          footer: <Button width="100%">Confirm</Button>,
        },
        {
          title:
            "Modal Title with a longer title or headline text that runs on for mutliple lines",
          hasLogo: true,
          footer: <Button width="100%">Confirm</Button>,
        },
        {
          title: (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              p={2}
            >
              <ChevronLeftIcon />
              <ArtsyLogoIcon height={30} />
              <CloseIcon />
            </Box>
          ),
        },
      ]}
    >
      <ModalDialogContent onClose={fn()} maxHeight={400}>
        <Join separator={<Spacer y={1} />}>
          <Text variant="sm">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque,
            neque voluptates! Sapiente, sint magnam. Assumenda, hic eius
            asperiores iure explicabo itaque accusantium, consectetur aut sit
            maxime culpa ab aliquid consequatur? Lorem, ipsum dolor sit amet
            consectetur adipisicing elit. Quam enim vel accusamus dolor
            voluptatibus? Cumque dicta blanditiis debitis rerum asperiores quae
            nihil minima praesentium, quaerat cupiditate amet dolor similique
            corporis? Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Quibusdam, eaque placeat mollitia aliquam porro molestiae recusandae
            eos iusto obcaecati quo ducimus in iure tenetur vitae animi ullam
            nisi voluptatem inventore! Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Eaque, neque voluptates! Sapiente, sint magnam.
          </Text>

          <Input placeholder="Enter your name" autoComplete="name" />

          <Input
            placeholder="Enter your email"
            type="email"
            autoComplete="email"
          />

          <Text variant="sm">
            Assumenda, hic eius asperiores iure explicabo itaque accusantium,
            consectetur aut sit maxime culpa ab aliquid consequatur? Lorem,
            ipsum dolor sit amet consectetur adipisicing elit. Quam enim vel
            accusamus dolor voluptatibus? Cumque dicta blanditiis debitis rerum
            asperiores quae nihil minima praesentium, quaerat cupiditate amet
            dolor similique corporis? Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Quibusdam, eaque placeat mollitia aliquam porro
            molestiae recusandae eos iusto obcaecati quo ducimus in iure tenetur
            vitae animi ullam nisi voluptatem inventore! Lorem ipsum, dolor sit
            amet consectetur adipisicing elit. Eaque, neque voluptates!
            Sapiente, sint magnam. Assumenda, hic eius asperiores iure explicabo
            itaque accusantium, consectetur aut sit maxime culpa ab aliquid
            consequatur? Lorem, ipsum dolor sit amet consectetur adipisicing
            elit. Quam enim vel accusamus dolor voluptatibus? Cumque dicta
            blanditiis debitis rerum asperiores quae nihil minima praesentium,
            quaerat cupiditate amet dolor similique corporis? Lorem, ipsum dolor
            sit amet consectetur adipisicing elit. Quibusdam, eaque placeat
            mollitia aliquam porro molestiae recusandae eos iusto obcaecati quo
            ducimus in iure tenetur vitae animi ullam nisi voluptatem inventore!
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque,
            neque voluptates! Sapiente, sint magnam. Assumenda, hic eius
            asperiores iure explicabo itaque accusantium, consectetur aut sit
            maxime culpa ab aliquid consequatur? Lorem, ipsum dolor sit amet
            consectetur adipisicing elit. Quam enim vel accusamus dolor
            voluptatibus? Cumque dicta blanditiis debitis rerum asperiores quae
            nihil minima praesentium, quaerat cupiditate amet dolor similique
            corporis? Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Quibusdam, eaque placeat mollitia aliquam porro molestiae recusandae
            eos iusto obcaecati quo ducimus in iure tenetur vitae animi ullam
            nisi voluptatem inventore!
          </Text>
        </Join>
      </ModalDialogContent>
    </States>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Default ModalDialogContent with various states including titles, logos, footers, and content.",
      },
    },
  },
}

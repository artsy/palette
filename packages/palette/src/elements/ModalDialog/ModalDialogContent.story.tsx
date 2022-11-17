import { action } from "@storybook/addon-actions"
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

export default {
  title: "Components/ModalDialogContent",
}

export const Default = () => {
  return (
    <States<Partial<ModalDialogContentProps>>
      states={[
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
      ]}
    >
      <ModalDialogContent onClose={action("onClose")} maxHeight={400}>
        <Join separator={<Spacer mt={1} />}>
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
  )
}

import React, { useState } from "react"
import { States } from "storybook-states"
import { Text } from "../Text"
import { Button } from "../Button"
import { ModalDialog, ModalDialogProps } from "./ModalDialog"

export default {
  title: "Components/ModalDialog",
}

const Demo = ({ children, ...rest }: Partial<ModalDialogProps>) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>

      {open && (
        <ModalDialog onClose={() => setOpen(false)} maxWidth={550} {...rest}>
          {children ? (
            children
          ) : (
            <Text variant="sm">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque,
              neque voluptates! Sapiente, sint magnam. Assumenda, hic eius
              asperiores iure explicabo itaque accusantium, consectetur aut sit
              maxime culpa ab aliquid consequatur? Lorem, ipsum dolor sit amet
              consectetur adipisicing elit. Quam enim vel accusamus dolor
              voluptatibus? Cumque dicta blanditiis debitis rerum asperiores
              quae nihil minima praesentium, quaerat cupiditate amet dolor
              similique corporis? Lorem, ipsum dolor sit amet consectetur
              adipisicing elit. Quibusdam, eaque placeat mollitia aliquam porro
              molestiae recusandae eos iusto obcaecati quo ducimus in iure
              tenetur vitae animi ullam nisi voluptatem inventore! Lorem ipsum,
              dolor sit amet consectetur adipisicing elit. Eaque, neque
              voluptates! Sapiente, sint magnam. Assumenda, hic eius asperiores
              iure explicabo itaque accusantium, consectetur aut sit maxime
              culpa ab aliquid consequatur? Lorem, ipsum dolor sit amet
              consectetur adipisicing elit. Quam enim vel accusamus dolor
              voluptatibus? Cumque dicta blanditiis debitis rerum asperiores
              quae nihil minima praesentium, quaerat cupiditate amet dolor
              similique corporis? Lorem, ipsum dolor sit amet consectetur
              adipisicing elit. Quibusdam, eaque placeat mollitia aliquam porro
              molestiae recusandae eos iusto obcaecati quo ducimus in iure
              tenetur vitae animi ullam nisi voluptatem inventore! Lorem ipsum,
              dolor sit amet consectetur adipisicing elit. Eaque, neque
              voluptates! Sapiente, sint magnam. Assumenda, hic eius asperiores
              iure explicabo itaque accusantium, consectetur aut sit maxime
              culpa ab aliquid consequatur? Lorem, ipsum dolor sit amet
              consectetur adipisicing elit. Quam enim vel accusamus dolor
              voluptatibus? Cumque dicta blanditiis debitis rerum asperiores
              quae nihil minima praesentium, quaerat cupiditate amet dolor
              similique corporis? Lorem, ipsum dolor sit amet consectetur
              adipisicing elit. Quibusdam, eaque placeat mollitia aliquam porro
              molestiae recusandae eos iusto obcaecati quo ducimus in iure
              tenetur vitae animi ullam nisi voluptatem inventore! Lorem ipsum,
              dolor sit amet consectetur adipisicing elit. Eaque, neque
              voluptates! Sapiente, sint magnam. Assumenda, hic eius asperiores
              iure explicabo itaque accusantium, consectetur aut sit maxime
              culpa ab aliquid consequatur? Lorem, ipsum dolor sit amet
              consectetur adipisicing elit. Quam enim vel accusamus dolor
              voluptatibus? Cumque dicta blanditiis debitis rerum asperiores
              quae nihil minima praesentium, quaerat cupiditate amet dolor
              similique corporis? Lorem, ipsum dolor sit amet consectetur
              adipisicing elit. Quibusdam, eaque placeat mollitia aliquam porro
              molestiae recusandae eos iusto obcaecati quo ducimus in iure
              tenetur vitae animi ullam nisi voluptatem inventore!
            </Text>
          )}
        </ModalDialog>
      )}
    </>
  )
}

export const Default = () => {
  return (
    <States<Partial<ModalDialogProps>>
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
      {(props) => <Demo {...props} />}
    </States>
  )
}

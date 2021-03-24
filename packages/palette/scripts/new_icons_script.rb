require 'csv'
require 'nokogiri'
require 'json'

template = <<-TSX
  import React from "react"
  import { Icon, IconProps } from "./Icon"

  /** REPLACE */
  export const REPLACE: React.FC<IconProps> = ({
    title = "TITLE",
    ...props
  }) => {
    return (
      <Icon {...props} viewBox="0 0 18 18">
        INSERT
      </Icon>
    )
  }
TSX

def minify(slug)
  input_path = "new_icons/input/#{slug}.svg"
  output_path = "new_icons/output/min/#{slug}.min.svg"
  command = "svgo #{input_path} -o #{output_path}"
  system command
end

def fix_attr(node, attr)
  value = attr.value
  node.remove_attribute(attr.name)
  camel_attr = attr.name.gsub(/-(.)/) { Regexp.last_match(1).upcase }
  node[camel_attr] = value
end

def fix_attrs(node)
  attributes = node.attributes.values

  dashed_attributes = attributes.filter do |attr|
    attr.name.include?('-')
  end

  dashed_attributes.each do |attr|
    fix_attr(node, attr)
  end

  node.children.each { |child| fix_attrs(child) }
end

def format(slug)
  input_path = "new_icons/output/min/#{slug}.min.svg"
  xml = File.read(input_path)
  doc = Nokogiri::XML(xml)
  svg = doc.at_css('svg')
  title = "<title>{title}</title>"
  svg.prepend_child(title)
  fix_attrs(svg)
  output_path = "new_icons/output/format/#{slug}.svg"
  File.write(output_path, doc.root.children.to_s)
end

def convert(slug, component_name, template, title)
  input_path = "new_icons/output/format/#{slug}.svg"
  data = File.read(input_path)
  tsx = template.gsub('REPLACE', component_name).gsub('INSERT', data).gsub('TITLE', title)
  output_path = "new_icons/output/tsx/#{component_name}.tsx"
  File.write(output_path, tsx)
end

rows = CSV.read('new_icons/list.csv', headers: true)

rows.each do |row|
  slug = row['filename'].split('.').first
  title = row['title']
  component_name = row['component_name']

  minify(slug)
  format(slug)
  convert(slug, component_name, template, title)
end

system 'cp new_icons/output/tsx/*.tsx new_icons/output/final/'
system 'yarn prettier --write new_icons/output/final/*.tsx'

system 'cp new_icons/output/final/*.tsx src/new_svgs/'
system 'cp src/svgs/Icon.tsx src/new_svgs/Icon.tsx'

names = rows.map { |row| row['component_name'] }
index_data = names.map { |name| "export * from \"./#{name}\"" }.join("\n")
File.write('src/new_svgs/index.tsx', index_data)

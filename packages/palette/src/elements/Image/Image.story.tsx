import React from "react"
import { Image } from "../Image"
import styled from "styled-components"
import { Box } from "../Box"
import { States } from "storybook-states"

const blurhashDataUri =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAQK0lEQVR4AQEgEN/vAP////////////////////////z//vr3//r18f/17ur/7+fi/+ng2v/j2NH/3c/J/9fHwf/SwLn/zbmz/8m0rv/Hsav/xrCr/8eyrf/KtrH/zru3/9PDv//Zy8j/4NTR/+fd2v/u5+P/9O/r//r38////fn////+////////////AP////////////////////////v//vr2//n08P/07un/7+fi/+nf2f/j19H/3c/I/9fHwP/Rv7j/zLmy/8m0rf/Hsar/xrCq/8exrP/JtbD/zbu3/9LCvv/Zysf/39TQ/+bd2v/t5uP/9O/r//r28v///fn////+////////////AP///////////////////////vv//fn2//n08P/07en/7ubh/+je2P/i1s//283H/9XFvv/Qvbb/y7ew/8exq//Frqj/xK2o/8Wvqv/Hsq7/y7i1/9HAvf/XycX/3tLP/+Xc2P/t5eL/8+7q//r28v///fj////+////////////AP///////////////////v///fr//Pn1//jz7v/z7Of/7eXf/+fd1v/g1M3/2cvE/9PDu//NurP/yLOs/8Sup//BqqT/wamj/8Grpv/Er6r/yLWx/869uv/VxsP/3NDN/+Ta1//r5OD/8u3p//n18f/+/Pf////9////////////AP///////////////////v///Pn/+/f0//bx7f/x6uX/6+Pd/+Xa1P/e0cr/18jA/9C/t//Ktq7/xK+n/8Cpof+9pZ7/vKOe/72loP/AqaX/xLCs/8q4tf/Rwr//2c3K/+HX1P/p4d7/8evn//f07//9+/b////8////////////AP///////////////////f/++/j/+vby//Xw6//v6OP/6eDa/+LX0P/bzsb/08S8/8y6sv/Fsaj/v6mg/7uimv+3npf/tpyW/7eemf+6op7/v6qm/8WzsP/Nvbv/1cnG/97U0f/m39v/7unl//by7v/8+vX////7////////////AP/////////////////++//8+fb/+PTw//Pu6f/t5uD/5t3X/9/Uzf/XysL/z7+2/8i1q//Aq6H/uqGY/7Sakf+xlY3/r5ON/7CVkP+0mpb/uaKf/8Csqv/IuLb/0cTB/9rQzf/k3Nj/7Obj//Tw7P/7+PP////6/////v//////AP/////////////+//78+v/6+PX/9vLu//Hr5//q497/49rT/9zQyP/Uxbz/y7qw/8OvpP+6o5n/s5mP/62Rh/+pi4L/qImC/6iLhv+skI3/spmX/7qlo//Dsa//zL+9/9bMyf/g2NX/6uTg//Lu6v/59/L///74/////f//////AP////////////78//z6+f/59vP/9PDs/+7p5P/o4dr/4NfQ/9jMxP/Pwbf/xrSq/72onP+0m4//rJCE/6WGe/+hf3b/n3x1/6B/ef+khYL/qo+N/7Ocm/+9qqn/x7m3/9LHxf/d1dL/5+Hd//Ds5//49fD//vz3/////P//////AP///////v7//fz7//v59//39PH/8u7q/+zm4f/l3tf/3dTM/9XIv//LvLH/wa6i/7ehk/+uk4X/pYV4/516bf+Ycmf/lm5m/5dxa/+beXb/ooWD/6uTkv+2o6L/wrOy/87CwP/Z0c7/5N7a/+7q5f/28+7//Pv1////+v////7/AP7+/v/9/f3//Pv6//n39v/18vD/8Ozo/+rk3//j29T/2tDI/9HEuv/Ht6v/vaib/7KZiv+niXr/nXpq/5VtXf+PYlX/jF5U/41hW/+Sa2j/mnl4/6SJif+wm5v/va2s/8q9vP/Wzcr/4dvY/+zo4//08uz/+/r0////+f////z/APz8/f/8/Pz/+vn5//f29f/z8e7/7urm/+ji3P/g2NH/2M3E/87Atf/DsqX/uKKU/6ySgf+hgG7/lm5b/4xeSv+FUT//gks+/4NPSP+IW1n/kWxs/52AgP+qlJT/uKem/8a5uP/Tysf/39nV/+rm4f/z8Ov/+vny////+P////v/APv7/P/7+/v/+fj4//b08//y7+3/7Ojl/+bg2v/e1s7/1crB/8u8sf/AraD/tJ2N/6eKeP+bd2L/j2JL/4ROM/98PB7/eTQc/3o5MP+ASkj/iWBg/5Z2eP+kjI3/s6Gh/8K1tP/QxsT/3dbT/+jk3//y7+n/+fjx///+9/////v/APr6+//6+vr/+Pf3//Xz8v/w7uz/6+fj/+Te2P/c1Mz/08e+/8i5rf+9qZv/sJiH/6OEcP+Wblb/iVc4/309B/90IQD/cAgA/3EaAP94Nzb/g1NV/5BucP+ghof/r52d/7+xsP/OxMH/29TR/+fi3f/w7uj/+Pfw//7+9v////r/APn6+//5+fr/9/f3//Tz8v/v7ev/6ubi/+Pd1//b0sr/0cW7/8a3qv+7ppf/rpSB/6B/af+SZ0z/hEwj/3cqAP9uAAD/aQAA/2oAAP9xIR//fUhL/4xmaf+cgYP/rZma/72urv/Mwr//2dPP/+Xh3P/w7ef/+Pfw//799v////n/APn5+v/4+Pn/9vb2//Py8f/v7Or/6eXh/+Lc1v/a0cn/0MS6/8W1qP+5pJT/rJF+/557Y/+PYkP/gUMC/3QUAP9qAAD/ZQAA/2YAAP9tAAD/ej9D/4lhZP+afYD/q5aX/7utrP/LwL7/2dLO/+Xg2//v7ef/9/bv//399f////n/APj5+v/4+Pn/9vb2//Py8f/u7Or/6eTh/+Lb1f/Z0Mj/0MO5/8W0p/+4o5P/q497/515YP+OXz7/gD4A/3MAAP9oAAD/YwAA/2QAAP9sAAD/eTo+/4heYv+ZfH7/qpWW/7usq//KwL7/2NHO/+Xg2//v7Ob/9/bv//399f////n/APj5+v/4+Pn/9vb2//Py8f/u7Or/6eXh/+Lb1f/a0Mj/0MO5/8W0p/+5opL/rI97/554YP+PXj3/gT4A/3QAAP9qAAD/ZQAA/2YAAP9tAAD/ejs//4lfYv+afH7/q5aW/7usq//KwL7/2NHO/+Xg2//v7eb/9/bv//399f////n/APn6+//4+fr/9vb3//Py8f/v7Or/6eXh/+Lc1v/a0cn/0cO5/8a0qP+6o5T/rZB9/596Y/+RYUL/hEIA/3cSAP9uAAD/aQAA/2oAAP9yBwP/fUFE/4xjZv+cf4H/rJeY/7ytrf/Mwb//2dLP/+Xh3P/v7ef/+Pfw//399v////n/APn6+//5+vr/9/f3//Tz8v/w7ev/6ubi/+Pd1//b0sr/0sW7/8i2qv+8pZb/sJKA/6N9Z/+VZkr/iEof/30oAP90AAD/cAAA/3EAAP94JiP/g0tN/5Bpa/+gg4T/r5qb/7+wr//Nw8D/29TQ/+bi3f/w7uj/+Pfw//7+9v////r/APr7/P/5+vv/+Pj4//X08//w7uz/6+fj/+Xe2P/d08z/1Me9/8q4rP+/qJr/s5aF/6eCbv+abFT/jlQ1/4Q6AP98HwD/eQsA/3oeBP+AOzj/ilZX/5Zwcv+kiIn/s5+f/8Kzsv/QxcP/3NXS/+jj3v/x7+n/+fjx//7+9/////v/APv8/f/6/Pz/+fn5//b19P/y8O3/7ejl/+bg2v/f1c7/1snA/827sP/Cq57/t5qL/6yIdv+gdF//lV9H/4xLLv+FOhn/gjMa/4M7Mf+ITUr/kWNi/515ev+qj4//uKSj/8W3tf/TyMb/39jU/+nl4P/y8Or/+vny////+P////v/APz+/v/7/f3/+vr6//f39f/z8e//7urm/+jh3P/h19D/2cvD/9C+tP/Gr6P/vJ+R/7GOfv+mfGr/nWtX/5RaRv+PTjv/jEo8/41PSP+SXVr/mm9u/6SCgv+wlpb/vamo/8m7uf/Wy8n/4drW/+vn4v/08ez/+/r0////+f////z/AP3////9/v7/+/z7//j49v/18/D/8Ozo/+rj3v/k2tP/3M7G/9PCuP/KtKj/wKWY/7eVhv+thXX/pHVl/51oWP+YX1D/llxR/5dgWv+ba2j/onp5/6uLi/+2nZz/wq+u/86/vf/Zz8z/5N3Z/+3p5P/18+7//Pv1////+v////3/AP7////+/////P38//r6+P/29PL/8u7q/+zm4f/m3Nb/39HJ/9fFvP/OuK3/xaqe/7ybjv+0jX//rIBy/6V0Z/+hbWH/n2ti/6Bvaf+keHT/qoWD/7OUk/+9pKP/x7Wz/9LEwv/d0tD/5uDc/+/r5v/39e///fz2////+///////AP///////////v/9//v7+f/49vP/9PDs/+7o4//o39n/4tTN/9rJwP/SvLL/yq+k/8Kilv+6lYn/s4l9/61/dP+peW//qHhw/6l8dv+shID/so+M/7qdm//Dq6n/zLq4/9bIxv/g1tP/6eLf//Ht6f/49vH//v34/////f//////AP/////////////+//39+v/5+PX/9fHu//Dq5f/r4dv/5NfQ/93MxP/WwLf/zrSq/8eonf/AnJH/uZGG/7SJf/+xhHv/sIN8/7GGgf+0jon/uZiV/8Ckov/Isq//0b+9/9rNyv/j2db/7OXh//Pv6//6+PP///75/////v//////AP////////////////7++//7+fb/9/Pv//Ls5//t497/59nT/+DPyP/ZxLz/0riv/8uto//Fopj/v5iP/7qRiP+3jYX/toyF/7ePiv+6lpL/v5+c/8WrqP/Nt7T/1cTB/97Qzf/m3Nn/7ufj//Xx7f/7+fT////6////////////AP///////////////////P/8+vf/+PTx//Tt6f/v5eD/6dzW/+PSy//cx7//1by0/8+xqP/Jp57/xJ6W/8CYj/+9lIz/vJSN/72Xkf/AnZj/xKai/8qwrf/RvLn/2cjF/+HU0P/o39v/8Onl//fy7v/8+vb////8////////////AP///////////////////f/9+/j/+vby//Xv6v/w5uH/693Y/+XUzf/eycL/2L+3/9K1rf/Mq6P/yKOb/8Sdlf/BmpL/wZqT/8Kdl//Eop7/yKun/861sf/VwLz/3MvI/+PW0//q4d3/8evn//j08P/9+/f////8////////////AP///////////////////v/+/Pn/+vbz//bv6//x6OP/7N/Z/+bVz//gy8T/2sG6/9S3r//Prqb/yqef/8ehmf/Fnpf/xJ6X/8Whm//HpqL/y66q/9G4tP/Xwr//3s3K/+XY1f/s49//8+zo//n18f/+/Pj////9////////////AP///////////////////v/+/fn/+/fz//fw7P/y6OP/7eDa/+fW0P/hzMb/28K7/9a5sf/RsKj/zKmh/8mjnP/HoJn/xqCa/8ejnv/JqaT/zbCs/9K6tv/YxMD/38/L/+bZ1v/t4+D/8+3p//n18f/+/Pj////+////////////HCU4UCaYN3YAAAAASUVORK5CYII="

export default {
  title: "Components/Image",
}

export const Default = () => {
  return (
    <States
      states={[
        {},
        {
          src: "https://picsum.photos/seed/example/300/200",
          srcSet:
            "https://picsum.photos/seed/example/300/200 1x, https://picsum.photos/seed/example/600/400 2x",
        },
        {
          placeHolderURL: blurhashDataUri,
        },
      ]}
    >
      <Image
        id="example"
        className="example"
        width="300px"
        height="200px"
        src="https://picsum.photos/seed/example/300/200"
      />
    </States>
  )
}

Default.story = {
  name: "Image",
}

export const ImageLazyLoad = () => {
  return (
    <>
      {Array.from(Array(100)).map((_, i) => (
        <Image
          key={i}
          lazyLoad
          width="300px"
          height="200px"
          src={`https://picsum.photos/seed/${i}/300/200`}
        />
      ))}
    </>
  )
}

ImageLazyLoad.story = {
  name: "Image + lazyLoad",
}

export const ImageLazyLoadSrcSet = () => {
  return (
    <>
      {Array.from(Array(100)).map((_, i) => (
        <Image
          key={i}
          lazyLoad
          width="300px"
          height="200px"
          src={`https://picsum.photos/seed/${i}/300/200`}
          srcSet={`https://picsum.photos/seed/${i}/300/200 1x, https://picsum.photos/seed/${i}/600/400 2x`}
        />
      ))}
    </>
  )
}

ImageLazyLoadSrcSet.story = {
  name: "Image + lazyLoad + srcSet",
}

export const ImageLazyLoadSrcSetPlaceHolderURL = () => {
  return (
    <Image
      lazyLoad
      width="300px"
      height="200px"
      placeHolderURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAQK0lEQVR4AQEgEN/vAP////////////////////////z//vr3//r18f/17ur/7+fi/+ng2v/j2NH/3c/J/9fHwf/SwLn/zbmz/8m0rv/Hsav/xrCr/8eyrf/KtrH/zru3/9PDv//Zy8j/4NTR/+fd2v/u5+P/9O/r//r38////fn////+////////////AP////////////////////////v//vr2//n08P/07un/7+fi/+nf2f/j19H/3c/I/9fHwP/Rv7j/zLmy/8m0rf/Hsar/xrCq/8exrP/JtbD/zbu3/9LCvv/Zysf/39TQ/+bd2v/t5uP/9O/r//r28v///fn////+////////////AP///////////////////////vv//fn2//n08P/07en/7ubh/+je2P/i1s//283H/9XFvv/Qvbb/y7ew/8exq//Frqj/xK2o/8Wvqv/Hsq7/y7i1/9HAvf/XycX/3tLP/+Xc2P/t5eL/8+7q//r28v///fj////+////////////AP///////////////////v///fr//Pn1//jz7v/z7Of/7eXf/+fd1v/g1M3/2cvE/9PDu//NurP/yLOs/8Sup//BqqT/wamj/8Grpv/Er6r/yLWx/869uv/VxsP/3NDN/+Ta1//r5OD/8u3p//n18f/+/Pf////9////////////AP///////////////////v///Pn/+/f0//bx7f/x6uX/6+Pd/+Xa1P/e0cr/18jA/9C/t//Ktq7/xK+n/8Cpof+9pZ7/vKOe/72loP/AqaX/xLCs/8q4tf/Rwr//2c3K/+HX1P/p4d7/8evn//f07//9+/b////8////////////AP///////////////////f/++/j/+vby//Xw6//v6OP/6eDa/+LX0P/bzsb/08S8/8y6sv/Fsaj/v6mg/7uimv+3npf/tpyW/7eemf+6op7/v6qm/8WzsP/Nvbv/1cnG/97U0f/m39v/7unl//by7v/8+vX////7////////////AP/////////////////++//8+fb/+PTw//Pu6f/t5uD/5t3X/9/Uzf/XysL/z7+2/8i1q//Aq6H/uqGY/7Sakf+xlY3/r5ON/7CVkP+0mpb/uaKf/8Csqv/IuLb/0cTB/9rQzf/k3Nj/7Obj//Tw7P/7+PP////6/////v//////AP/////////////+//78+v/6+PX/9vLu//Hr5//q497/49rT/9zQyP/Uxbz/y7qw/8OvpP+6o5n/s5mP/62Rh/+pi4L/qImC/6iLhv+skI3/spmX/7qlo//Dsa//zL+9/9bMyf/g2NX/6uTg//Lu6v/59/L///74/////f//////AP////////////78//z6+f/59vP/9PDs/+7p5P/o4dr/4NfQ/9jMxP/Pwbf/xrSq/72onP+0m4//rJCE/6WGe/+hf3b/n3x1/6B/ef+khYL/qo+N/7Ocm/+9qqn/x7m3/9LHxf/d1dL/5+Hd//Ds5//49fD//vz3/////P//////AP///////v7//fz7//v59//39PH/8u7q/+zm4f/l3tf/3dTM/9XIv//LvLH/wa6i/7ehk/+uk4X/pYV4/516bf+Ycmf/lm5m/5dxa/+beXb/ooWD/6uTkv+2o6L/wrOy/87CwP/Z0c7/5N7a/+7q5f/28+7//Pv1////+v////7/AP7+/v/9/f3//Pv6//n39v/18vD/8Ozo/+rk3//j29T/2tDI/9HEuv/Ht6v/vaib/7KZiv+niXr/nXpq/5VtXf+PYlX/jF5U/41hW/+Sa2j/mnl4/6SJif+wm5v/va2s/8q9vP/Wzcr/4dvY/+zo4//08uz/+/r0////+f////z/APz8/f/8/Pz/+vn5//f29f/z8e7/7urm/+ji3P/g2NH/2M3E/87Atf/DsqX/uKKU/6ySgf+hgG7/lm5b/4xeSv+FUT//gks+/4NPSP+IW1n/kWxs/52AgP+qlJT/uKem/8a5uP/Tysf/39nV/+rm4f/z8Ov/+vny////+P////v/APv7/P/7+/v/+fj4//b08//y7+3/7Ojl/+bg2v/e1s7/1crB/8u8sf/AraD/tJ2N/6eKeP+bd2L/j2JL/4ROM/98PB7/eTQc/3o5MP+ASkj/iWBg/5Z2eP+kjI3/s6Gh/8K1tP/QxsT/3dbT/+jk3//y7+n/+fjx///+9/////v/APr6+//6+vr/+Pf3//Xz8v/w7uz/6+fj/+Te2P/c1Mz/08e+/8i5rf+9qZv/sJiH/6OEcP+Wblb/iVc4/309B/90IQD/cAgA/3EaAP94Nzb/g1NV/5BucP+ghof/r52d/7+xsP/OxMH/29TR/+fi3f/w7uj/+Pfw//7+9v////r/APn6+//5+fr/9/f3//Tz8v/v7ev/6ubi/+Pd1//b0sr/0cW7/8a3qv+7ppf/rpSB/6B/af+SZ0z/hEwj/3cqAP9uAAD/aQAA/2oAAP9xIR//fUhL/4xmaf+cgYP/rZma/72urv/Mwr//2dPP/+Xh3P/w7ef/+Pfw//799v////n/APn5+v/4+Pn/9vb2//Py8f/v7Or/6eXh/+Lc1v/a0cn/0MS6/8W1qP+5pJT/rJF+/557Y/+PYkP/gUMC/3QUAP9qAAD/ZQAA/2YAAP9tAAD/ej9D/4lhZP+afYD/q5aX/7utrP/LwL7/2dLO/+Xg2//v7ef/9/bv//399f////n/APj5+v/4+Pn/9vb2//Py8f/u7Or/6eTh/+Lb1f/Z0Mj/0MO5/8W0p/+4o5P/q497/515YP+OXz7/gD4A/3MAAP9oAAD/YwAA/2QAAP9sAAD/eTo+/4heYv+ZfH7/qpWW/7usq//KwL7/2NHO/+Xg2//v7Ob/9/bv//399f////n/APj5+v/4+Pn/9vb2//Py8f/u7Or/6eXh/+Lb1f/a0Mj/0MO5/8W0p/+5opL/rI97/554YP+PXj3/gT4A/3QAAP9qAAD/ZQAA/2YAAP9tAAD/ejs//4lfYv+afH7/q5aW/7usq//KwL7/2NHO/+Xg2//v7eb/9/bv//399f////n/APn6+//4+fr/9vb3//Py8f/v7Or/6eXh/+Lc1v/a0cn/0cO5/8a0qP+6o5T/rZB9/596Y/+RYUL/hEIA/3cSAP9uAAD/aQAA/2oAAP9yBwP/fUFE/4xjZv+cf4H/rJeY/7ytrf/Mwb//2dLP/+Xh3P/v7ef/+Pfw//399v////n/APn6+//5+vr/9/f3//Tz8v/w7ev/6ubi/+Pd1//b0sr/0sW7/8i2qv+8pZb/sJKA/6N9Z/+VZkr/iEof/30oAP90AAD/cAAA/3EAAP94JiP/g0tN/5Bpa/+gg4T/r5qb/7+wr//Nw8D/29TQ/+bi3f/w7uj/+Pfw//7+9v////r/APr7/P/5+vv/+Pj4//X08//w7uz/6+fj/+Xe2P/d08z/1Me9/8q4rP+/qJr/s5aF/6eCbv+abFT/jlQ1/4Q6AP98HwD/eQsA/3oeBP+AOzj/ilZX/5Zwcv+kiIn/s5+f/8Kzsv/QxcP/3NXS/+jj3v/x7+n/+fjx//7+9/////v/APv8/f/6/Pz/+fn5//b19P/y8O3/7ejl/+bg2v/f1c7/1snA/827sP/Cq57/t5qL/6yIdv+gdF//lV9H/4xLLv+FOhn/gjMa/4M7Mf+ITUr/kWNi/515ev+qj4//uKSj/8W3tf/TyMb/39jU/+nl4P/y8Or/+vny////+P////v/APz+/v/7/f3/+vr6//f39f/z8e//7urm/+jh3P/h19D/2cvD/9C+tP/Gr6P/vJ+R/7GOfv+mfGr/nWtX/5RaRv+PTjv/jEo8/41PSP+SXVr/mm9u/6SCgv+wlpb/vamo/8m7uf/Wy8n/4drW/+vn4v/08ez/+/r0////+f////z/AP3////9/v7/+/z7//j49v/18/D/8Ozo/+rj3v/k2tP/3M7G/9PCuP/KtKj/wKWY/7eVhv+thXX/pHVl/51oWP+YX1D/llxR/5dgWv+ba2j/onp5/6uLi/+2nZz/wq+u/86/vf/Zz8z/5N3Z/+3p5P/18+7//Pv1////+v////3/AP7////+/////P38//r6+P/29PL/8u7q/+zm4f/m3Nb/39HJ/9fFvP/OuK3/xaqe/7ybjv+0jX//rIBy/6V0Z/+hbWH/n2ti/6Bvaf+keHT/qoWD/7OUk/+9pKP/x7Wz/9LEwv/d0tD/5uDc/+/r5v/39e///fz2////+///////AP///////////v/9//v7+f/49vP/9PDs/+7o4//o39n/4tTN/9rJwP/SvLL/yq+k/8Kilv+6lYn/s4l9/61/dP+peW//qHhw/6l8dv+shID/so+M/7qdm//Dq6n/zLq4/9bIxv/g1tP/6eLf//Ht6f/49vH//v34/////f//////AP/////////////+//39+v/5+PX/9fHu//Dq5f/r4dv/5NfQ/93MxP/WwLf/zrSq/8eonf/AnJH/uZGG/7SJf/+xhHv/sIN8/7GGgf+0jon/uZiV/8Ckov/Isq//0b+9/9rNyv/j2db/7OXh//Pv6//6+PP///75/////v//////AP////////////////7++//7+fb/9/Pv//Ls5//t497/59nT/+DPyP/ZxLz/0riv/8uto//Fopj/v5iP/7qRiP+3jYX/toyF/7ePiv+6lpL/v5+c/8WrqP/Nt7T/1cTB/97Qzf/m3Nn/7ufj//Xx7f/7+fT////6////////////AP///////////////////P/8+vf/+PTx//Tt6f/v5eD/6dzW/+PSy//cx7//1by0/8+xqP/Jp57/xJ6W/8CYj/+9lIz/vJSN/72Xkf/AnZj/xKai/8qwrf/RvLn/2cjF/+HU0P/o39v/8Onl//fy7v/8+vb////8////////////AP///////////////////f/9+/j/+vby//Xv6v/w5uH/693Y/+XUzf/eycL/2L+3/9K1rf/Mq6P/yKOb/8Sdlf/BmpL/wZqT/8Kdl//Eop7/yKun/861sf/VwLz/3MvI/+PW0//q4d3/8evn//j08P/9+/f////8////////////AP///////////////////v/+/Pn/+vbz//bv6//x6OP/7N/Z/+bVz//gy8T/2sG6/9S3r//Prqb/yqef/8ehmf/Fnpf/xJ6X/8Whm//HpqL/y66q/9G4tP/Xwr//3s3K/+XY1f/s49//8+zo//n18f/+/Pj////9////////////AP///////////////////v/+/fn/+/fz//fw7P/y6OP/7eDa/+fW0P/hzMb/28K7/9a5sf/RsKj/zKmh/8mjnP/HoJn/xqCa/8ejnv/JqaT/zbCs/9K6tv/YxMD/38/L/+bZ1v/t4+D/8+3p//n18f/+/Pj////+////////////HCU4UCaYN3YAAAAASUVORK5CYII="
      src="https://picsum.photos/seed/example/300/200"
      srcSet="https://picsum.photos/seed/example/300/200 1x, https://picsum.photos/seed/example/600/400 2x"
    />
  )
}

ImageLazyLoadSrcSetPlaceHolderURL.story = {
  name: "Image + lazyLoad + srcSet + placeHolderURL",
}

const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
`

export const WithStyledImage = () => {
  return (
    <Box width={400} height={400} bg="red">
      <StyledImage
        placeHolderURL={blurhashDataUri}
        src="https://picsum.photos/seed/example/300/200"
        srcSet="https://picsum.photos/seed/example/300/200 1x, https://picsum.photos/seed/example/600/400 2x"
      />
    </Box>
  )
}

export const WithCustomStyle = () => {
  return (
    <Box width={400} height={400} bg="red">
      <Image
        width="100%"
        height="100%"
        src="https://picsum.photos/seed/example/300/200"
        style={{
          borderRadius: "10px",
          borderColor: "blue",
          borderWidth: "10px",
          borderStyle: "solid",
        }}
      />
    </Box>
  )
}

export const EnsuresImageDoesNotCollapse = () => {
  return (
    <Box width={300} height={200} bg="red">
      <Image src="https://picsum.photos/seed/example/300/200" lazyLoad />
    </Box>
  )
}

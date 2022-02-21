import React, { useEffect, ReactElement } from 'react'
import * as d3 from 'd3'
interface Props {

}

// eslint-disable-next-line no-empty-pattern
export default function D3 ({}: Props): ReactElement {
  const data = [{ x: 60, y: 60 }, { x: 120, y: 60 }, { x: 220, y: 60 }, { x: 320, y: 60 }]

  const init = () => {
    const warp = document.getElementById('warp') as HTMLElement

    // demo1
    // warp.append(span()) // hello world
    // warp.append(table()) // table
    // warp.append(div()) // a bar chart

    // demo2
    // warp.append(circle())
    circle() // 三个圆点
  }
  useEffect(() => {
    init()
  }, [])

  // demo1
  // const span = () => {
  //   const span = d3.create('span')
  //   span.style('color', 'white')
  //   span.style('background-color', 'black')
  //   span.html('Hello, world!')
  //   return span.node()
  // }

  // const table = () => {
  //   const table = d3.create('table')
  //   const tbody = table.append('tbody')
  //   tbody.append('tr').append('td').text('Frist!')
  //   tbody.append('tr').append('td').text('second!')
  //   tbody.append('tr').append('td').text('third!')
  //   return table.node()
  // }

  // const div = () => {
  //   const div = d3.create('div').style('font', '10px sans-serif').style('text-align', 'right').style('color', 'red')
  //   // 连接选择和数据，附加输入栏。
  //   div.selectAll('div').data(data).join('div').style('background', 'steelblue')
  //     .style('padding', '3px')
  //     .style('margin', '1px')
  //     .style('width', (d: any) => `${d * 10}px`)
  //     .text((d: any) => d)

  //   return div.node()
  // }

  /*
    demo2
  */
  const circle = () => {
    // const circle = d3.selectAll('circle')
    //   .style('fill', 'steelblue') // 填充颜色
    //   .attr('r', 30)  // attr 设置属性 半径
    //   .attr('cx', () => Math.random() * 720)
    //   .data([32, 57, 112])
    //   .attr('r', (d: number) => Math.sqrt(d))
    // return circle.node()

    // const svg = d3.select('svg').selectAll('circle').data([32, 57, 40, 293, 500])
    // const circleEnter = svg.enter().append('circle') // enter 获取需要插入的选择集(数据个数大于元素个数)的占位符.
    // circleEnter.attr('cy', 60)
    // circleEnter.attr('cx', function (d: void, i: number) { return i * 100 + 30 })
    // circleEnter.attr('r', function (d: number) { return Math.sqrt(d) })
    // svg.exit().remove()

    // const svg = d3.select('svg')
    // const circle = svg.selectAll('circle')
    //   .data([32, 57, 223], function (d: any) { return d })
    // circle.enter().append('circle')
    //   .attr('cy', 60)
    //   .attr('cx', function (d: void, i: number) { return i * 100 + 30 })
    //   .attr('r', function (d: number) { return Math.sqrt(d) })
    // circle.exit().remove()

    const svg = d3.select('svg')
    // const d = { x: 60, y: 60 }
    // svg.append('circle')
    //   .attr('cx', d.x)
    //   .attr('cy', d.y)
    //   .attr('r', 25)

    // svg.selectAll('circle')
    //   .data(data)
    //   .enter().append('circle')
    //   .attr('cx', function (d: any) { return d.x })
    //   .attr('cy', function (d: any) { return d.y })
    //   .attr('r', 25)

    const circle = svg.selectAll('circle').data(data)
    circle.exit().remove()
    circle.enter().append('circle')
      .attr('r', 20)
      .merge(circle)
      .attr('cx', function (d: any) { return d.x })
      .attr('cy', function (d: any) { return d.y })

    circle.enter().append('circle')
      .attr('r', 0)
      .attr('cx', 20)
      .attr('cy', 0)
      .transition()
      .attr('r', 50)
      .attr('cx', 100)
      .attr('cy', 100)

    circle.exit().transition()
      .attr('r', 0)
      .remove()
  }
  return (
    <div id="warp">
      <svg width="720" height="120">
        {/* <circle cx="60" cy="60" r="10"></circle>
        <circle cx="100" cy="60" r="10"></circle>
        <circle cx="140" cy="60" r="10"></circle> */}
      </svg>
    </div>
  )
}

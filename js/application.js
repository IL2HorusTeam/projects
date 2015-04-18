$(document).ready(function() {

  $('.sidebar-control').on('click', function() {
    $('.sidebar-content').toggleClass('visible')
  })

  var content = $('.content'),
      primary_width = content.width(),
      primary_height = content.height()

  var bundle = d3.layout.bundle(),
      treemap = d3.layout.treemap()
                .size([primary_width, primary_height])
                .value(function(d) { return d.size || 1 })

  var div = d3.select("main").append("div")
              .style("width", primary_width + "px")
              .style("height", primary_height + "px")

  d3.json("projects.json", function(error, items) {
    var nodes = treemap.nodes(packages.root(items)),
        links = packages.requirements(nodes)

    div.selectAll(".cell")
        .data(nodes)
      .enter().append("div")
        .attr("class", function(d) {
          return d.children
                 ? "cell container"
                 : ["cell", d.type, d.state].join(" ")
        })
        .call(cell)
        .append("span")
        .text(function(d) { return d.children ? null : d.key })

    nodes.forEach(function (node, i) {
      if (!node.children) {
        node.__element__ = $('.cell:not(.container)').filter(function () {
          return $(this).find('span').text() == node.key
        })[0]
      }
    })

    var line = d3.svg.line()
      .interpolate("bundle")
      .tension(.1)
      .x(function(d) { return d.x + d.dx / 2 })
      .y(function(d) { return d.y + d.dy / 2 })

    var svg = div.append("svg")
              .attr("width", primary_width)
              .attr("height", primary_height)

    svg.selectAll(".link")
        .data(bundle(links))
      .enter().append("path")
        .attr("class", "link")
        .attr("d", line)

    $('.cell:not(.container)').on('click', function() {

      function activate(element) {
        var dependencies = [],
            others = []

        nodes.forEach(function(node) {
          if (node != element.__data__ && !node.children) {
            (
              element.__data__.requirements.indexOf(node.name) < 0
              ? others
              : dependencies
            ).push(node)
          }
        })

        var current_links = $.grep($('.link'), function (link) {
          return (
            link.__data__.indexOf(element.__data__) >= 0
            && link.__data__.filter(function(node) {
              return dependencies.indexOf(node) != -1
            }).length > 0
          )
        })

        $(element).addClass('active')
        $(others.map(function (node) { return node.__element__ })).hide()
        $(current_links).show()
      }

      function deactivate(element) {
        $(element).removeClass('active')
        $('.link').hide()
        $('.cell').show()
      }

      if ($(this).hasClass('active')) {
        deactivate(this)
      } else {
        var active = $('.cell.active')

        if (active.length) {
          deactivate(active)
        }

        activate(this)
      }
    })

    d3.select(window).on("resize", function() {

      function clear_interval() {
        clearInterval(this.resize_interval)
        this.resize_interval = undefined
      }

      if (this.resize_interval !== undefined) {
        clear_interval()
      }

      this.resize_interval = setInterval(function () {
        clear_interval()
        resize()
      }, 200)
    })

    function resize() {
      var width = content.width(),
          height = content.height()

      div.style("width", width + "px").style("height", height + "px")
      svg.attr("width", width).attr("height", height)
      treemap.size([width, height])

      var nodes = treemap.nodes(packages.root(items))
      div.selectAll(".cell").data(nodes).call(cell)
      svg.selectAll(".link").data(bundle(links)).attr("d", line)
    }
  })

  function cell() {
    this.style("left", function(d) { return d.x + "px" })
        .style("top", function(d) { return d.y + "px" })
        .style("width", function(d) { return d.dx - 1 + "px" })
        .style("height", function(d) { return d.dy - 1 + "px" })
  }

  var packages = {

    // Lazily construct the package hierarchy from class names.
    root: function(items) {
      var map = {}

      function find(name, data) {
        var node = map[name], i
        if (!node) {
          node = map[name] = data || {name: name, children: []}
          if (name.length) {
            node.parent = find(name.substring(0, i = name.lastIndexOf(".")))
            node.parent.children.push(node)
            node.key = name.substring(i + 1)
          }
        }
        return node
      }

      items.forEach(function(d) {
        find(d.name, d)
      })

      return map[""]
    },

    // Return a list of requirements for the given array of nodes.
    requirements: function(nodes) {
      var map = {},
          requirements = []

      // Compute a map from name to node.
      nodes.forEach(function(d) {
        map[d.name] = d
      })

      // For each import, construct a link from the source to target node.
      nodes.forEach(function(d) {
        if (d.requirements) d.requirements.forEach(function(i) {
          requirements.push({source: map[d.name], target: map[i]})
        })
      })

      return requirements
    }
  }

})

console.log("script.js is running – embedding + attribute view");

// =========================
// Embedding scatterplot (left panel) – polished
// =========================
const embeddingSpec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  
    title: {
      text: "Ward Embedding by Closure Patterns",
      fontSize: 16,
      anchor: "start",
      offset: 10
    },
  
    data: {
      url: "embeddings_2d.csv"
    },
  
    // Join in total closures from closures_by_ward.csv
    transform: [
      {
        lookup: "WARD",
        from: {
          data: { url: "closures_by_ward.csv" },
          key: "WARD",
          fields: ["count"]
        }
      },
      {
        calculate: "datum.count == null ? 0 : datum.count",
        as: "total_closures"
      }
    ],

    params: [
        {
          name: "wardSelect",
          select: {
            type: "point",
            fields: ["WARD"],
            on: "click",
            clear: "dblclick",
            empty: "all"
          }
        }
    ],
    
  
    width: "container",
    height: "container",
  
    // Use a layered spec: circles + labels for top wards
    layer: [
      // Base circles
      {
        mark: {
          type: "circle",
          filled: true,
          stroke: "#555",
          strokeWidth: 0.4
        },
        selection: {
          brush: { type: "interval" },
          highlight: { type: "multi", fields: ["WARD"] }
        },
        encoding: {
          x: {
            field: "x",
            type: "quantitative",
            title: "Embedding X (PCA1)"
          },
          y: {
            field: "y",
            type: "quantitative",
            title: "Embedding Y (PCA2)"
          },
          color: {
            field: "total_closures",
            type: "quantitative",
            title: "Total closures",
            scale: { scheme: "oranges" }
          },
          size: {
            field: "total_closures",
            type: "quantitative",
            scale: { range: [40, 220] }
          },
          opacity: {
            condition: { param: "wardSelect", value: 0.95 },
            value: 0.25
          },
          tooltip: [
            { field: "WARD", type: "ordinal", title: "Ward" },
            { field: "x", type: "quantitative", format: ".2f", title: "Embedding X" },
            { field: "y", type: "quantitative", format: ".2f", title: "Embedding Y" },
            { field: "total_closures", type: "quantitative", title: "Total closures" }
          ]
        }
      },
      /*
      // Text labels for the highest-closure wards
      {
        transform: [
          {
            // keep only wards in the top ~5 by closures
            window: [{ op: "rank", as: "rank_closures" }],
            sort: [{ field: "total_closures", order: "descending" }]
          },
          { filter: "datum.rank_closures <= 5" }
        ],
        mark: {
          type: "text",
          dy: -10,
          fontSize: 11,
          fontWeight: "bold",
          fill: "#444"
        },
        encoding: {
          x: { field: "x", type: "quantitative" },
          y: { field: "y", type: "quantitative" },
          text: { field: "WARD", type: "ordinal" }
        }
      }*/
    ],
  
    config: {
      /*background: "#faf9f7",*/
      background: "#ffffff",
      axis: {
        gridColor: "#e6e6e6",
        gridOpacity: 0.8,
        tickColor: "#aaa",
        labelFontSize: 11,
        titleFontSize: 12,
        titleFontWeight: "bold"
      },
      legend: {
        labelFontSize: 11,
        titleFontSize: 12
      },
      view: { stroke: null }
    }
  };
  
  

// =========================
// Attribute view (top-right panel)
// Bar chart: total closures per ward
// =========================
const attributeSpec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  
    title: {
      text: "Total Closures per Ward",
      fontSize: 14,
      anchor: "start",
      offset: 10
    },
  
    data: {
      url: "closures_by_ward.csv"
    },

  width: "container",
  height: "container",

  mark: "bar",

  params: [
    {
      name: "wardSelect",
      select: {
        type: "point",
        fields: ["WARD"],
        on: "click",
        clear: "dblclick",
        empty: "all"
      }
    }
  ],

  encoding: {
    x: {
        field: "WARD",
        type: "ordinal",
        sort: "ascending",
        title: "Ward",
        axis: {
          labelAngle: -90,
          labelFontSize: 9,
          labelOverlap: "greedy",
          labelLimit: 40
        }
    },
    y: {
      field: "count",              // column name in closures_by_ward.csv
      type: "quantitative",
      title: "Total closures"
    },
    color: {
      condition: { param: "wardSelect", value: "#e67e22" },
      value: "#f0c29b"
    },
    tooltip: [
      { field: "WARD", type: "ordinal", title: "Ward" },
      { field: "count", type: "quantitative", title: "Total closures" }
    ]
  },

  config: {
    background: "#ffffff",
    axis: {
      gridColor: "#e6e6e6",
      labelFontSize: 10,
      titleFontSize: 12,
      titleFontWeight: "bold"
    },
    view: { stroke: null }
  }

};

// =========================
// Spatial view (bottom-right panel)
// Choropleth map of total closures per ward
// =========================
const mapSpec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  
    title: {
      text: "Spatial Distribution of Closures",
      fontSize: 14,
      anchor: "start",
      offset: 10
    },
  
    data: {
      url: "ward_closures.geojson",
      format: {
        type: "json",
        property: "features"
      }
    },

    transform: [
        { calculate: "toNumber(datum.properties.ward)", as: "WARD" }
    ],
    
    params: [
        {
          name: "mapSelect",
          select: {
            type: "point",
            fields: ["WARD"],
            on: "click",
            clear: "dblclick",
            empty: "all"
          }
        }
    ],
    
  
    width: "container",
    height: "container",
    padding: { top: 10, left: 5, right: 10, bottom: 10 },
  
    mark: {
      type: "geoshape",
      stroke: "#ffffff",
      strokeWidth: 0.5
    },
  
    projection: {
      type: "mercator"
    },
  
    encoding: {
      color: {
        field: "properties.count",
        type: "quantitative",
        title: "Total closures",
        scale: { scheme: "oranges" }
      },
      strokeWidth: {
        condition: { param: "mapSelect", value: 2 },
        value: 0.5
      },      
      tooltip: [
        { field: "properties.ward", type: "ordinal", title: "Ward" },
        { field: "properties.count", type: "quantitative", title: "Total closures" }
      ]
    },
  
    config: {
        background: "#ffffff",
        autosize: {
          type: "fit",
          contains: "padding"
        },
        padding: 0,
        view: { stroke: null }
    }
    
  };
  

// =========================
// Embed views
// =========================
//vegaEmbed("#embedding-view", embeddingSpec).catch(console.error);
//vegaEmbed("#attribute-view", attributeSpec).catch(console.error);
//vegaEmbed("#spatial-view", mapSpec).catch(console.error);

Promise.all([
    vegaEmbed("#embedding-view", embeddingSpec),
    vegaEmbed("#attribute-view", attributeSpec),
    vegaEmbed("#spatial-view", mapSpec)
  ]).then(([embedEmbedding, embedAttr, embedMap]) => {
    const v1 = embedEmbedding.view; // embedding
    const v2 = embedAttr.view;      // bar chart
    const v3 = embedMap.view;       // map
  
    console.log("Embedding signals:", v1.getState().signals);
    console.log("Bar signals:", v2.getState().signals);
    console.log("Map signals:", v3.getState().signals);
  
    let isSyncing = false;
  
    // 공통 링크 함수
    function link(sourceView, sourceSignal, targets) {
      sourceView.addSignalListener(sourceSignal, (name, value) => {
        if (isSyncing) return;
        isSyncing = true;
  
        targets.forEach(({ view, signal }) => {
          view.signal(signal, value).runAsync();
        });
  
        isSyncing = false;
      });
    }
  
    // ✅ 임베딩 / 막대에서 선택 → 서로 + 지도에 반영
    link(v1, "wardSelect_tuple", [
      { view: v2, signal: "wardSelect_tuple" },
      { view: v3, signal: "mapSelect_tuple" }
    ]);
  
    link(v2, "wardSelect_tuple", [
      { view: v1, signal: "wardSelect_tuple" },
      { view: v3, signal: "mapSelect_tuple" }
    ]);
  
    // ✅ 지도에서 선택 → 임베딩 / 막대에 반영
    link(v3, "mapSelect_tuple", [
      { view: v1, signal: "wardSelect_tuple" },
      { view: v2, signal: "wardSelect_tuple" }
    ]);
}).catch(console.error);  
/**
 * ELASTICSEARCH CONFIDENTIAL
 * _____________________________
 *
 *  [2014] Elasticsearch Incorporated All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Elasticsearch Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Elasticsearch Incorporated
 * and its suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Elasticsearch Incorporated.
 */



define(function () {
  'use strict';
  var simple_metric = {
    __template: { field: ""},
    field: "{field}",
    script: {
      // populated by a global rule
    }
  }, field_metric = {
    __template: { field: ""},
    field: "{field}"
  }, gap_policy = {
    __one_of:[ "skip", "insert_zeros" ]
  }, simple_pipeline = {
      __template: {
        buckets_path: ""
      },
      buckets_path: "",
      format: "",
      gap_policy: gap_policy
  };
  var rules = {
    "*": {
      "aggs": {
        __template: {
          "NAME": {
            "AGG_TYPE": {

            }
          }
        }
      },
      "min": simple_metric,
      "max": simple_metric,
      "avg": simple_metric,
      "sum": simple_metric,
      "stats": simple_metric,
      "extended_stats": simple_metric,
      "value_count": {
        __template: {
          "field": ""
        },
        "field": "{field}",
        "script": {
          // populated by a global rule
        }
      },
      "global": {},
      "filter": {},
      "filters": {
        __template: {
          "filters": {
            "NAME": { __scope_link: "GLOBAL.filter" }
          }
        },
        "filters": {},
        "other_bucket": { __one_of: [ true, false ] },
        "other_bucket_key": ""
      },
      "missing": field_metric,
      "nested": {
        __template: {
          "path": ""
        },
        "path": ""
      },
      "reverse_nested": {
        __template: {
          "path": ""
        },
        "path": ""
      },
      "terms": {
        __template: {
          "field": "",
          "size": 10
        },
        "field": "{field}",
        "size": 10,
        "shard_size": 10,
        "order": {
          __template: {
            "_term": "asc"
          },
          "_term": { __one_of: ["asc", "desc"] },
          "_count": { __one_of: ["asc", "desc"] },
          "*": { __one_of: ["asc", "desc"] }
        },
        "min_doc_count": 10,
        "script": {
          // populated by a global rule
        },
        // TODO: these also support regex - extend!
        "include": "*",
        "exclude": "*",
        "execution_hint": { __one_of: ["map", "global_ordinals", "global_ordinals_hash", "global_ordinals_low_cardinality"] },
        "show_term_doc_count_error": { __one_of: [ true, false ]},
        "collect_mode": { __one_of: [ "depth_first", "breadth_first"]}
      },
      "significant_terms": {
        __template: {
          "field": ""
        },
        "field": "{field}",
        "size": 10,
        "shard_size": 10,
        "shard_min_doc_count": 10,
        "min_doc_count": 10,
        "include": { __one_of: [ "*", { pattern: "", flags: ""}]},
        "exclude": { __one_of: [ "*", { pattern: "", flags: ""}]},
        "execution_hint": { __one_of: ["map", "global_ordinals", "global_ordinals_hash" ] },
        "background_filter": {
          __scope_link: "GLOBAL.filter"
        },
        "mutual_information": {
          "include_negatives": { __one_of: [ true, false ] }
        },
        "chi_square": {
          "include_negatives": { __one_of: [ true, false ] },
          "background_is_superset": { __one_of: [ true, false ] }
        },
        "gnd": {
          "background_is_superset": { __one_of: [ true, false ] }
        }
      },
      "range": {
        __template: {
          "field": "",
          "ranges": [
            { "from": 50, "to": 100 },
          ]
        },
        "field": "{field}",
        "ranges": [
          { "to": 50, "from": 100, "key": "" }
        ],
        "keyed": { __one_of: [true, false]},
        "script": {
          // populated by a global rule
        }
      },
      "date_range": {
        __template: {
          "field": "",
          "ranges": [
            { "from": "now-10d/d", "to": "now" },
          ]
        },
        "field": "{field}",
        "format": "MM-yyy",
        "ranges": [
          { "to": "", "from": "", "key": "" }
        ],
        "keyed": { __one_of: [true, false]},
        "script": {
          // populated by a global rule
        }
      },
      "ip_range": {
        __template: {
          "field": "",
          "ranges": [
            { "from": "10.0.0.5", "to": "10.0.0.10" },
          ]
        },
        "field": "{field}",
        "format": "MM-yyy",
        "ranges": [
          { "to": "", "from": "", "key": "", "mask": "10.0.0.127/25" }
        ],
        "keyed": { __one_of: [true, false]},
        "script": {
          // populated by a global rule
        }
      },
      "histogram": {
        __template: {
          "field": "price",
          "interval": 50
        },
        "field": "{field}",
        "interval": 50,
        "min_doc_count": 0,
        "order": {
          __template: {
            "_key": "asc"
          },
          "_key": { __one_of: ["asc", "desc"] },
          "_count": { __one_of: ["asc", "desc"] },
          "*": { __one_of: ["asc", "desc"] }
        },
        "keyed": { __one_of: [true, false]}

      },
      "date_histogram": {
        __template: {
          "field": "date",
          "interval": "month"
        },
        "field": "{field}",
        "interval": { __one_of: [ "year", "quarter", "week", "day", "hour", "minute", "second"]},
        "min_doc_count": 0,
        "order": {
          __template: {
            "_key": "asc"
          },
          "_key": { __one_of: ["asc", "desc"] },
          "_count": { __one_of: ["asc", "desc"] },
          "*": { __one_of: ["asc", "desc"] }
        },
        "keyed": { __one_of: [true, false]},
        "pre_zone": "-01:00",
        "post_zone": "-01:00",
        "pre_zone_adjust_large_interval": { __one_of: [true, false]},
        "factor": 1000,
        "pre_offset": "1d",
        "post_offset": "1d",
        "format": "yyyy-MM-dd",
        "time_zone": "00:00"
      },
      "geo_distance": {
        __template: {
          "field": "location",
          "origin": { "lat": 52.3760, "lon": 4.894 },
          "ranges": [
            { "from": 100, "to": 300 },
          ]
        },
        "field": "{field}",
        "origin": { "lat": 0.0, "lon": 0.0 },
        "unit": { __one_of: ["mi", "km", "in", "yd", "m", "cm", "mm"]},
        "ranges": [
          { "from": 50, "to": 100 }
        ],
        "distance_type": { __one_of: ["arc", "sloppy_arc", "plane"]}

      },
      "geohash_grid": {
        __template: {
          "field": "",
          "precision": 3
        },
        "field": "{field}",
        "precision": { __one_of: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]},
        "size": 10,
        "shard_size": 10
      },
      "percentiles": {
        __template: {
          "field": "",
          "percents": [1.0, 5.0, 25.0, 50.0, 75.0, 95.0, 99.0]
        },
        "field": "{field}",
        "percents": {
          __template: [1.0, 5.0, 25.0, 50.0, 75.0, 95.0, 99.0],
          // mark type as list
          __any_of: []
        },
        "script": {
          // populated by a global rule
        },
        "compression": 100
      },
      "cardinality": {
        __template: {
          "field": ""
        },
        "precision_threshold": 100,
        "rehash": true,
        "script": {
          // populated by a global rule
        }
      },
      "scripted_metric": {
        __template: {
          "init_script": "",
          "map_script": "",
          "combine_script": "",
          "reduce_script": ""
        },
        "init_script": {
          __scope_link: "GLOBAL.script"
        },
        "map_script": {
          __scope_link: "GLOBAL.script"
        },
        "combine_script": {
          __scope_link: "GLOBAL.script"
        },
        "reduce_script": {
          __scope_link: "GLOBAL.script"
        },
        "lang": "groovy",
        "params": {},
        "reduce_params": {}
      },
      "geo_bounds": {
        __template: {
          field: ""
        },
        field: "{field}",
        wrap_longitude: { __one_of: [ true, false ]}
      },
      "top_hits": {
        __template: {
          size: 10
        },
        from: 0,
        size: 10,
        sort: {
          __template: [],
          __scope_link: "_search.sort"
        },
        highlight: {
        },
        explain: { __one_of: [ true, false ]},
        _source: {
          __template: "",
          __scope_link: "_search._source"
        },
        script_fields: {
          __scope_link: "_search.script_fields"
        },
        fielddata_fields: ["{field}"],
        version: { __one_of: [ true, false ]}
      },
      "percentile_ranks": {
        __template: {
          field: "",
          values: [ 10, 15]
        },
        field: "{field}",
        values: [],
        "script": {
          // populated by a global rule
        },
        "compression": 100
      },
      "sampler": {
        __template: {

        },
        "field": "{field}",
        "script": {
          // populated by a global rule
        },
        "shard_size": 100,
        "max_docs_per_value": 3,
        "execution_hint": { __one_of: ["map", "global_ordinals", "bytes_hash" ] }
      },
      "children": {
        __template: {
          "type": "",
        },
        "type": ""
      },
      "derivative": simple_pipeline,
      "avg_bucket": simple_pipeline,
      "max_bucket": simple_pipeline,
      "min_bucket": simple_pipeline,
      "sum_bucket": simple_pipeline,
      "moving_avg": {
        __template: {
          buckets_path: ""
        },
        buckets_path: "",
        format: "",
        gap_policy: gap_policy,
        "window": 5,
        model: { __one_of: [ "simple", "linear", "ewma", "holt", "holt_winters" ] },
        settings: {
          type: { __one_of: [ "add", "mult" ] },
          alpha: 0.5,
          beta: 0.5,
          gamma: 0.5,
          period: 7
        }
      },
      "cumulative_sum": {
        __template: {
          buckets_path: ""
        },
        buckets_path: "",
        format: ""
      },
      "bucket_script": {
        __template: {
          buckets_path: "",
          script: {}
        },
        buckets_path: "",
        format: "",
        gap_policy: gap_policy,
        script: {
          // populated by a global rule
        }
      }
    }
  };
  return function init(api) {

    api.addGlobalAutocompleteRules('aggregations', rules);
    api.addGlobalAutocompleteRules('aggs', rules);
  };

});
"use strict";

let metaInfo;

function initPage() {
    //populate page with required elements, e.g., header for title and drawing area

    const main = document.getElementById("main");

    metaInfo = getTutorialInfo(); //should be provided in app.js
    if (!metaInfo)
        metaInfo = { groupNames: "ERROR", exerciseNum: "ERROR" };


    const mainTitle = document.createElement("h1");
    mainTitle.style.fontFamily = "sans-serif";
    mainTitle.style.margin = "1rem auto";
    mainTitle.style.textAlign = "center";
    mainTitle.textContent = "InfoVIS Exercise " + metaInfo.exerciseNum;
    main.appendChild(mainTitle);

    document.title = "InfoVIS Exercise " + metaInfo.exerciseNum;


    const groupBlock = document.createElement("h2");
    groupBlock.style.fontFamily = "sans-serif";
    groupBlock.style.margin = "1rem auto";
    groupBlock.style.textAlign = "center";
    groupBlock.style.color = "gray";
    groupBlock.textContent = metaInfo.groupNames;
    main.appendChild(groupBlock);

    const drawingArea = document.createElement("div");
    drawingArea.id = "mainCanvas";
    drawingArea.style.width = "800px";
    drawingArea.style.height = "800px";
    drawingArea.style.margin = "2rem auto";
    main.appendChild(drawingArea);

    return drawingArea;
}

function start() {
    if (document.getElementById("mainCanvas"))
        return; //already initialized

    const drawingArea = initPage();

    const params = {
        width: 800,
        height: 800
    };

    const two = new Two(params);
    two.appendTo(drawingArea);

    two.scene.position.x = params.width / 2;
    two.scene.position.y = params.height / 2;

    //perform drawing instructions, this is defined in app.js
    draw(two);

    // render content, either once or 60 times per second for animated/changeable shapes
    if (metaInfo.isAnimated)
        two.play();
    else
        two.update();
}

function getData() {
  return [
    {
      "term": "percurrent",
      "frequency": 139,
      "timeseries": [
        0.77984,
        0.13937,
        0.40049,
        0.18919,
        0.46703,
        0.27364,
        0.33884
      ]
    },
    {
      "term": "cradlechild",
      "frequency": 93,
      "timeseries": [
        0.82209,
        0.28540,
        0.15559,
        0.69361,
        0.30964,
        0.88773,
        0.75061
      ]
    },
    {
      "term": "rehair",
      "frequency": 36,
      "timeseries": [
        0.05750,
        0.46593,
        0.89676,
        0.43793,
        0.18789,
        0.94101,
        0.29498
      ]
    },
    {
      "term": "inactuation",
      "frequency": 25,
      "timeseries": [
        0.17472,
        0.35931,
        0.19098,
        0.59665,
        0.78979,
        0.38642,
        0.55791
      ]
    },
    {
      "term": "reannexed",
      "frequency": 76,
      "timeseries": [
        0.58849,
        0.46407,
        0.74887,
        0.32305,
        0.24446,
        0.00675,
        0.82733
      ]
    },
    {
      "term": "doppia",
      "frequency": 47,
      "timeseries": [
        0.61266,
        0.90443,
        0.75005,
        0.65522,
        0.29645,
        0.97453,
        0.79582
      ]
    },
    {
      "term": "albergo",
      "frequency": 186,
      "timeseries": [
        0.04109,
        0.25258,
        0.39721,
        0.63448,
        0.66667,
        0.02257,
        0.44755
      ]
    },
    {
      "term": "evectant",
      "frequency": 150,
      "timeseries": [
        0.03498,
        0.02094,
        0.79370,
        0.13354,
        0.81617,
        0.62065,
        0.56980
      ]
    },
    {
      "term": "sashery",
      "frequency": 180,
      "timeseries": [
        0.69052,
        0.17284,
        0.60653,
        0.28352,
        0.83924,
        0.03359,
        0.84588
      ]
    },
    {
      "term": "hearsecloth",
      "frequency": 151,
      "timeseries": [
        0.33372,
        0.75793,
        0.54497,
        0.55042,
        0.62235,
        0.82223,
        0.81883
      ]
    },
    {
      "term": "suffixes",
      "frequency": 100,
      "timeseries": [
        0.54601,
        0.61270,
        0.66324,
        0.93526,
        0.22894,
        0.55477,
        0.25774
      ]
    },
    {
      "term": "mechanizable",
      "frequency": 16,
      "timeseries": [
        0.99804,
        0.79346,
        0.80527,
        0.46316,
        0.94022,
        0.83062,
        0.47431
      ]
    },
    {
      "term": "bundts",
      "frequency": 42,
      "timeseries": [
        0.45506,
        0.85140,
        0.42688,
        0.82388,
        0.76839,
        0.26592,
        0.13652
      ]
    },
    {
      "term": "oxalacetic",
      "frequency": 42,
      "timeseries": [
        0.86778,
        0.68433,
        0.34093,
        0.47624,
        0.07135,
        0.05742,
        0.04441
      ]
    },
    {
      "term": "alimentic",
      "frequency": 111,
      "timeseries": [
        0.13213,
        0.79984,
        0.70798,
        0.39892,
        0.11963,
        0.14043,
        0.05380
      ]
    },
    {
      "term": "lazarous",
      "frequency": 11,
      "timeseries": [
        0.37444,
        0.26496,
        0.25594,
        0.77774,
        0.35311,
        0.86273,
        0.83922
      ]
    },
    {
      "term": "formy",
      "frequency": 26,
      "timeseries": [
        0.55618,
        0.44919,
        0.25988,
        0.03124,
        0.69139,
        0.82560,
        0.63699
      ]
    },
    {
      "term": "rectoclysis",
      "frequency": 26,
      "timeseries": [
        0.55101,
        0.95609,
        0.28815,
        0.88134,
        0.17797,
        0.97476,
        0.51358
      ]
    },
    {
      "term": "uninvoiced",
      "frequency": 80,
      "timeseries": [
        0.48795,
        0.40577,
        0.59635,
        0.37608,
        0.72406,
        0.06141,
        0.23159
      ]
    },
    {
      "term": "poaceous",
      "frequency": 142,
      "timeseries": [
        0.22427,
        0.97010,
        0.08616,
        0.59536,
        0.66844,
        0.96094,
        0.68942
      ]
    },
    {
      "term": "stewpot",
      "frequency": 38,
      "timeseries": [
        0.59086,
        0.97584,
        0.20372,
        0.28073,
        0.00149,
        0.30332,
        0.45936
      ]
    },
    {
      "term": "nineteenthly",
      "frequency": 104,
      "timeseries": [
        0.99105,
        0.07421,
        0.87101,
        0.57767,
        0.17364,
        0.52017,
        0.18444
      ]
    },
    {
      "term": "amphithalmi",
      "frequency": 169,
      "timeseries": [
        0.96354,
        0.73017,
        0.88998,
        0.20574,
        0.49477,
        0.56767,
        0.01673
      ]
    },
    {
      "term": "enrober",
      "frequency": 129,
      "timeseries": [
        0.60080,
        0.70720,
        0.55664,
        0.32434,
        0.63361,
        0.50837,
        0.84080
      ]
    },
    {
      "term": "rescues",
      "frequency": 44,
      "timeseries": [
        0.95432,
        0.98517,
        0.86288,
        0.34860,
        0.54693,
        0.69076,
        0.10995
      ]
    },
    {
      "term": "mallemuck",
      "frequency": 185,
      "timeseries": [
        0.23311,
        0.75199,
        0.12797,
        0.87735,
        0.84034,
        0.97344,
        0.89112
      ]
    },
    {
      "term": "claviers",
      "frequency": 116,
      "timeseries": [
        0.93136,
        0.05761,
        0.60060,
        0.29202,
        0.40461,
        0.16239,
        0.28143
      ]
    },
    {
      "term": "burree",
      "frequency": 113,
      "timeseries": [
        0.63718,
        0.99459,
        0.54361,
        0.72383,
        0.85656,
        0.42232,
        0.59991
      ]
    },
    {
      "term": "intravital",
      "frequency": 115,
      "timeseries": [
        0.35244,
        0.44718,
        0.52531,
        0.97083,
        0.47095,
        0.63691,
        0.06201
      ]
    },
    {
      "term": "beaded",
      "frequency": 105,
      "timeseries": [
        0.09275,
        0.75400,
        0.05805,
        0.87073,
        0.76341,
        0.61874,
        0.36929
      ]
    },
    {
      "term": "murderish",
      "frequency": 73,
      "timeseries": [
        0.21771,
        0.41987,
        0.32912,
        0.09405,
        0.91496,
        0.91512,
        0.91028
      ]
    },
    {
      "term": "notelessness",
      "frequency": 79,
      "timeseries": [
        0.95193,
        0.92991,
        0.87222,
        0.87924,
        0.26277,
        0.08880,
        0.91246
      ]
    },
    {
      "term": "bewired",
      "frequency": 20,
      "timeseries": [
        0.48975,
        0.60216,
        0.90655,
        0.51605,
        0.86960,
        0.76570,
        0.31719
      ]
    },
    {
      "term": "enchanters",
      "frequency": 39,
      "timeseries": [
        0.39447,
        0.13903,
        0.54667,
        0.46121,
        0.02757,
        0.06573,
        0.46164
      ]
    },
    {
      "term": "ensorrow",
      "frequency": 120,
      "timeseries": [
        0.65484,
        0.35251,
        0.66267,
        0.66751,
        0.19318,
        0.97967,
        0.89671
      ]
    },
    {
      "term": "pipage",
      "frequency": 104,
      "timeseries": [
        0.47159,
        0.87456,
        0.66549,
        0.17781,
        0.27307,
        0.36561,
        0.75369
      ]
    },
    {
      "term": "moulins",
      "frequency": 155,
      "timeseries": [
        0.12825,
        0.20563,
        0.21975,
        0.91732,
        0.13898,
        0.41081,
        0.40729
      ]
    },
    {
      "term": "minislumps",
      "frequency": 73,
      "timeseries": [
        0.36849,
        0.85384,
        0.80461,
        0.79357,
        0.37152,
        0.18026,
        0.09505
      ]
    },
    {
      "term": "euhemerist",
      "frequency": 23,
      "timeseries": [
        0.65423,
        0.55245,
        0.32421,
        0.51573,
        0.29551,
        0.87690,
        0.52845
      ]
    },
    {
      "term": "taxameter",
      "frequency": 170,
      "timeseries": [
        0.73918,
        0.20327,
        0.82600,
        0.62093,
        0.44462,
        0.78277,
        0.24958
      ]
    },
    {
      "term": "taskit",
      "frequency": 96,
      "timeseries": [
        0.16681,
        0.14504,
        0.52792,
        0.49833,
        0.84779,
        0.87283,
        0.56802
      ]
    },
    {
      "term": "implications",
      "frequency": 147,
      "timeseries": [
        0.63508,
        0.76715,
        0.57077,
        0.09474,
        0.14753,
        0.44468,
        0.72688
      ]
    },
    {
      "term": "cringing",
      "frequency": 155,
      "timeseries": [
        0.90218,
        0.30741,
        0.85625,
        0.17129,
        0.77367,
        0.70628,
        0.54632
      ]
    },
    {
      "term": "supperward",
      "frequency": 76,
      "timeseries": [
        0.84958,
        0.65025,
        0.58104,
        0.30664,
        0.89893,
        0.70058,
        0.18782
      ]
    },
    {
      "term": "constuctor",
      "frequency": 186,
      "timeseries": [
        0.36092,
        0.64755,
        0.54770,
        0.03576,
        0.53432,
        0.52766,
        0.25966
      ]
    },
    {
      "term": "astral",
      "frequency": 74,
      "timeseries": [
        0.22780,
        0.91779,
        0.14024,
        0.82721,
        0.83291,
        0.52737,
        0.99246
      ]
    },
    {
      "term": "ransom",
      "frequency": 61,
      "timeseries": [
        0.58292,
        0.33837,
        0.50256,
        0.53565,
        0.64887,
        0.45447,
        0.13516
      ]
    },
    {
      "term": "tipplers",
      "frequency": 50,
      "timeseries": [
        0.54818,
        0.46327,
        0.87021,
        0.00726,
        0.92137,
        0.75220,
        0.82865
      ]
    },
    {
      "term": "unfester",
      "frequency": 148,
      "timeseries": [
        0.41627,
        0.71307,
        0.98548,
        0.50594,
        0.84113,
        0.67755,
        0.84238
      ]
    },
    {
      "term": "moulding",
      "frequency": 181,
      "timeseries": [
        0.29981,
        0.52881,
        0.85409,
        0.52296,
        0.55021,
        0.47104,
        0.30872
      ]
    }
  ].sort((a, b) => b.frequency - a.frequency);
}

// The bounding box function of Two.js is atrocious...
const _bbx = new Map();
function getTextBoundingBox(two, text, x, y, size) {
  const key = `${text}@${size}`;

  const {width, height} = _bbx.get(key) || (() => {
      const t = two.makeText(text, x, y, {size, opacity: 0});
      two.update();

      const {width, height} = t._renderer.elem.getBoundingClientRect();  // ooof
      two.remove(t);
      two.update();

      _bbx.set(key, {width, height});
      return {width, height};
    })();

  const top = y - height/2;
  const bottom = y + height/2;
  const left = x - width/2;
  const right = x + width/2;

  return {
    top,
    bottom,
    left,
    right,
    width,
    height,
  };
}


//make sure that everything is loaded and all functions are ready to call before running framework
window.onload = start;

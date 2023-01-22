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
    drawingArea.style.width = "900px";
    drawingArea.style.height = "600px";
    drawingArea.style.margin = "4rem auto";
    main.appendChild(drawingArea);

    return drawingArea;
}


function start() {
    if (document.getElementById("mainCanvas"))
        return; //already initialized

    const drawingArea = initPage();

    const params = {
        width: 900,
        height: 600
    };

    const two = new Two(params);
    two.appendTo(drawingArea);

    //perform drawing instructions, this is defined in app.js
    draw(two);

    // render content, either once or 60 times per second for animated/changeable shapes
    if (metaInfo.isAnimated)
        two.play();
    else
        two.update();
}

function getData() {
    const res = {};
    res.dataEx9 = [
        [0.40574694263788946, 0.5854654636480697], [0.29589029989677595, 0.5354747588890086], [0.6844529552804697, 0.13836768948442463], [0.4982953452966432, 0.21291424741286819], [0.31765782643294793, 0.5088371622346636], [0.6077734577369743, 0.14087681991321357], [0.3350956170124326, 0.5362420291530333], [0.6331903454415919, 0.11052187879296915], [0.02421921951858759, 0.8070684051920722], [0.6682288496052516, 0.07024266489863067], [0.40140793717537016, 0.36280077215231255], [0.5374182284768889, 0.12195675743232472], [0.3713642556789353, 0.4036521561887497], [0.08979551478716713, 0.5922671122196442], [0.3170581342566826, 0.7461592969574726], [0.6077838939137791, 0.012858006941708973], [0.24084849170574213, 0.7023776162339508], [0.6296526053876531, 0.1585990916947632], [0.629850513532543, 0.154833438209085], [0.28800951557474164, 0.4677070985110682], [0.47064354540990727, 0.2058763163529242], [0.16475165271184172, 0.6527468423675578], [0.6959942655453917, 0.30351564894245153], [0.3704272858371841, 0.3711119745078266], [0.13984565189766, 0.5957949463824875], [0.10859499482949872, 0.8662906846277006], [0.4905193470257443, 0.467066577368506], [0.13822832059985043, 0.7600945220047548], [0.12373003885661607, 0.7953620673078186], [0.6282260068674712, 0.26719263029924517], [0.7613017404174452, 0.21590491987605487], [0.18849256397122716, 0.7625557154181641], [0.5299899872668677, 0.5392497894778727], [0.2451942099952654, 0.6752416064381127], [0.45020302053284234, 0.21545172965324255], [0.3970765914269916, 0.5991285730119784], [0.4870532054638922, 0.5407975581167924], [0.6201430973751285, 0.19817493687404794], [0.07586571699085934, 0.9155634544824076], [0.06340664311866213, 0.7367368771922665], [0.5964752538594521, 0.187696949460899], [0.2049253195067359, 0.7273639494826585], [0.6551199841602426, 0.1424529040903469], [0.41264230926095347, 0.49204769045784214], [0.2157842867490743, 0.7976591859227565], [0.2883254868708661, 0.37871831265463396], [0.3934780744763723, 0.4686552819961165], [0.32573045951824153, 0.6030913421436512], [0.2378583782800621, 0.7730645962291068], [0.4082617442290311, 0.49221459968805875], [0.5935357711752502, 0.20727760229461978], [0.6311628146648338, 0.15675312460339563], [0.4104272162123844, 0.42708415215027457], [0.11212827423527139, 0.6600011895385998], [0.09668141908766384, 0.8007146370892522], [0.21558675902164007, 0.7253035684915261], [0.6018400644791515, 0.17629498973174904], [0.2760932936716214, 0.6781275949310033], [0.37172210428764396, 0.5022060576008152], [0.2559862498264951, 0.6874327046058242], [0.4259038559398888, 0.526091473559167], [0.7098804268046798, 0.17728035825378888], [0.40020959085292696, 0.4516713977947218], [0.3823342057036454, 0.5070865547518382], [0.15785796447543568, 0.68153844045565], [0.5494597695925103, 0.12570568392052678], [0.5559012670269615, 0.09883044775573434], [0.1704150165743452, 0.6820798945293581], [0.386199559060849, 0.4339940683598106], [0.2934746808475112, 0.8651038821863719], [0.6347457490724938, 0.1928374055105082], [0.5963998027441334, 0.21887740873379152], [0.26950299850193227, 0.6821940164862433], [0.22863811432570894, 0.49563573745717976], [0.63757163249652, 0.20697902077242045], [0.7417915524065306, 0.2748154157644475], [0.1657287185688156, 0.7495350138655414], [0.22642918201536763, 0.8012523423101838], [0.6347222214113332, 0.2557807898821535], [0.6568206385128089, 0.2211522853591323], [0.405761857864693, 0.5303612612149048], [0.6730441284734824, 0.10937332503802766], [0.418110342472903, 0.5557696486842058], [0.29131266550168655, 0.450833167392434], [0.3206474434601173, 0.8806699275640799], [0.47416958026803746, 0.3853182816249916], [0.6802765251290102, 0.2460701434900942], [0.23617361690181848, 0.795435214765834], [0.1709856752635214, 0.7061277227964682], [0.42038395016411345, 0.44932877197758747], [0.2298966259956883, 0.7503840331523799], [0.294996909822971, 0.4895337907698808], [0.6690764292326901, 0.1975723441386606], [0.6106854972643482, 0.18955189986748253], [0.19238952630570827, 0.768255387052923], [0.6246375075976843, 0.26503348062724574], [0.4940265375199472, 0.42198824719375727], [0.33232452673604973, 0.47521560513494243], [0.20687423545587902, 0.6940068740255845], [0.42015091965814677, 0.43842258257308186], [0.6070769069245806, 0.13533834028196193], [0.6858351903559594, 0.19081489837017726], [0.3740916762183, 0.3993729510959292], [0.6332135715503197, 0.1789315269120067], [0.7576303794495298, 0.18257841228699662], [0.36776128400762154, 0.3106040970402142], [0.2914446242886707, 0.4637173885739009], [0.20409006124015713, 0.819716795099601], [0.26294990791843914, 0.799419390988876], [0.25200941880512817, 0.4148707037745657], [0.20866764374409516, 0.6950464015390833], [0.16207108978622628, 0.8414151233538696], [0.3411144143547049, 0.5112771510663505], [0.43624622075937425, 0.34041500573730377], [0.5863558757867747, 0.15100408973993462], [0.5463031170665957, 0.18497714629229745], [0.15235810437107195, 0.7138719276120921], [0.10663960505223086, 0.6239139730287473], [0.3030791422666367, 0.6506838105031736], [0.5713686233764365, 0.23573280949146658], [0.43311723420692505, 0.5040052151095498], [0.6425027663801657, 0.07614302911607074], [0.2833358542681681, 0.686302213749483], [0.7058130050158596, 0.07018890360725977], [0.09013474772455252, 0.6397661103742452], [0.22163071575439844, 0.7310917207537722], [0.7703815043386633, 0.11471035152724586], [0.37366145351760865, 0.5226150990663685], [0.24705970849489836, 0.8575854521655335], [0.32383505603102436, 0.5771827550676217], [0.3967645375084715, 0.4853662870291807], [0.29005438535844563, 0.7252066566039178], [0.18878553972307774, 0.7441430752705571], [0.6765109099400579, 0.24140835991211654], [0.6245093018296972, 0.0991035726441794], [0.4509816492827431, 0.4416131940593886], [0.27063384034165616, 0.4261696531806829], [0.2772403229085408, 0.43698810453983117], [0.29397135120797435, 0.5090317971581627], [0.5753723994418267, 0.10088920181122503], [0.6381249129709428, 0.2200712099314152], [0.5245803370331612, 0.4270947213963026], [0.3717217508614861, 0.5218768279309071], [0.6887347553894387, 0.1870376287863775], [0.2316480400391973, 0.7990891825599156], [0.623516815779117, 0.19311988341846076], [0.4068309546042851, 0.5087256380535139], [0.25023104158108384, 0.678024203248672], [0.1614397041609971, 0.7642879059242496], [0.1594419339483275, 0.7192641433133806]
    ];
    return res;
}


function getRandomNumber(min, maxExclusive) {
    return min + Math.floor(Math.random() * (maxExclusive - min));
}


function drawUnitSquareScatterPlotAxes(two) {
    two.makeLine(250, 500, 650, 500); //x axis
    two.makeLine(250, 500, 250, 100); //y axis
    two.makeText("0", 250, 510);
    two.makeText("1", 240, 103);
    two.makeText("1", 648, 510);
}


function drawToUnitSquareScatterPlot(two, data, color) {
    data.forEach(vec => {
        const nodeCircle = two.makeCircle(250 + vec[0] * 400, 500 - vec[1] * 400, 3);
        nodeCircle.fill = color;
        nodeCircle.linewidth = 0;
    });
}

function getTenDistinctColors() {
    return [
        '#33a02c', '#1f78b4', '#e31a1c', '#ff7f00', '#cab2d6', '#6a3d9a', '#a6cee3', '#b2df8a', '#fb9a99', '#fdbf6f'
    ];
}

//make sure that everything is loaded and all functions are ready to call before running framework
window.onload = start;
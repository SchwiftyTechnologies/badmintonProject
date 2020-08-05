this.state = {
    rally_number: 1,
    shot_type: ["Smash", "Lob", "Drive", "Toss", "Serve", "Nill"],
    shot_hand: ["A", "F", "B"],
    shot_type_top_1: "Smash",
    shot_type_top_2: "Nill",
    shot_type_top_3: "Nill",
    shot_type_bot_1: "Smash",
    shot_type_bot_2: "Nill",
    shot_type_bot_3: "Nill",
    shot_hand_top_1: "A",
    shot_hand_top_2: "A",
    shot_hand_top_3: "A",
    shot_hand_bot_1: "A",
    shot_hand_bot_2: "A",
    shot_hand_bot_3: "A",
    final_dictionary: {},
    pattern_array: [],
    patter_length: -1,
    stretchTop: true,
    distanceTop: true,
    placrecTop: true,
    heightTop: false,
    stretchBot: true,
    distanceBot: true,
    placrecBot: true,
    heightBot: false,
    factor: 5,
    numberFactor: 5,
    leftRally: 0,
    rightRally: 0,
    leftRallyDisp: 0,
    rightRallyDisp: 0,
    firstClick: true,
    graph_data: [],
    firstshot: true,
    secondshot: true,
    thirdshot: true,
    points_table: null,
    percentage: false,
    shots: false,
    percFirstShot: true,
    percSecondShot: false,
    percThirdShot: false,
    top_smash_count_B: 0,
    top_smash_count_F: 0,
    top_drive_count_B: 0,
    top_drive_count_F: 0,
    top_lob_count_B: 0,
    top_lob_count_F: 0,
    top_toss_count_B: 0,
    top_toss_count_F: 0,
    bot_smash_count_B: 0,
    bot_smash_count_F: 0,
    bot_drive_count_B: 0,
    bot_drive_count_F: 0,
    bot_toss_count_B: 0,
    bot_toss_count_F: 0,
    bot_lob_count_B: 0,
    bot_lob_count_F: 0,
    top_forehand: true,
    top_backhand: true,
    top_winners: false,
    top_win_smash: false,
    top_win_plac: false,
    top_losers: false,
    top_losers_smash: false,
    top_losers_plac: false,
    top_losers_net: false,
    bot_forehand: true,
    bot_backhand: true,
    bot_winners: false,
    bot_win_smash: false,
    bot_win_plac: false,
    bot_losers: false,
    bot_losers_smash: false,
    bot_losers_plac: false,
    bot_losers_net: false,
    isRightSide: false,
    rightSideData: [],
    info_dictionary: {},
    totalStretchTop: 0,
    avgStretchTop: 0,
    totalStretchBot: 0,
    avgStretchBot: 0,
    totalDistanceTop: 0,
    avgDistanceTop: 0,
    totalDistanceBot: 0,
    avgDistanceBot: 0,
    setArray: [],
    setLeft: 1,
    setRight: 1,
    left_top_score_set1: 0,
    right_top_score_set1: 0,
    left_top_score_set2: 0,
    right_top_score_set2: 0,
    left_top_score_set3: 0,
    right_top_score_set3: 0,
    left_bot_score_set1: 0,
    right_bot_score_set1: 0,
    left_bot_score_set2: 0,
    right_bot_score_set2: 0,
    left_bot_score_set3: 0,
    right_bot_score_set3: 0,
    indShot: true,
    fromShot: 0,
    toShot: 9,
    currentDiff: 10,
    videoPlayer: false,
    videoPlayerRight: false,
    url: "",
    height1_perc: 33,
    height2_perc: 67,
    width1_perc: 33,
    width2_perc: 67,
    isBottom: false,
};

const testData = [
    {
        "studentno": "167-40-6988",
        "name": "Oswell Mamwell",
        "collegeid": 7,
        "registrations": [
            {
                "regdate": "2023-06-03",
                "balance": 832
            },
            {
                "regdate": "2018-11-07",
                "balance": -1655
            }
        ]
    },
    {
        "studentno": "341-36-4819",
        "name": "Oona Kimbell",
        "collegeid": 2,
        "registrations": [
            {
                "regdate": "2019-04-17",
                "balance": -973
            },
            {
                "regdate": "2019-08-05",
                "balance": 397
            }
        ]
    },
    {
        "studentno": "220-37-9775",
        "name": "Gratia Davsley",
        "collegeid": 9,
        "registrations": [
            {
                "regdate": "2017-09-01",
                "balance": 4910
            },
            {
                "regdate": "2019-08-26",
                "balance": 716
            },
            {
                "regdate": "2019-01-24",
                "balance": -2305
            }
        ]
    },
    {
        "studentno": "293-89-8495",
        "name": "Arri Dadswell",
        "collegeid": 2,
        "registrations": [
            {
                "regdate": "2019-05-25",
                "balance": 511
            },
            {
                "regdate": "2019-10-31",
                "balance": -4624
            }
        ]
    },
    {
        "studentno": "271-18-1279",
        "name": "Thalia Feldberger",
        "collegeid": 5,
        "registrations": [
            {
                "regdate": "2016-08-22",
                "balance": -856
            },
            {
                "regdate": "2015-12-08",
                "balance": -3845
            }
        ]
    },
    {
        "studentno": "706-26-4240",
        "name": "Cosmo Ames",
        "collegeid": 9,
        "registrations": [
            {
                "regdate": "2022-06-26",
                "balance": -1292
            },
            {
                "regdate": "2015-06-11",
                "balance": 1829
            }
        ]
    },
    {
        "studentno": "770-30-6320",
        "name": "Caryl Searle",
        "collegeid": 2,
        "registrations": [
            {
                "regdate": "2020-08-26",
                "balance": -361
            },
            {
                "regdate": "2015-07-04",
                "balance": -50
            },
            {
                "regdate": "2018-04-05",
                "balance": 4037
            }
        ]
    },
    {
        "studentno": "603-25-3474",
        "name": "Flori Delete",
        "collegeid": 3,
        "registrations": [
            {
                "regdate": "2016-01-17",
                "balance": -1210
            },
            {
                "regdate": "2023-12-22",
                "balance": -4126
            }
        ]
    },
    {
        "studentno": "190-39-5352",
        "name": "Tarrah George",
        "collegeid": 6,
        "registrations": [
            {
                "regdate": "2020-09-16",
                "balance": 3818
            },
            {
                "regdate": "2014-06-18",
                "balance": -2798
            },
            {
                "regdate": "2016-12-27",
                "balance": 1755
            }
        ]
    },
    {
        "studentno": "234-97-9067",
        "name": "Dian Santen",
        "collegeid": 6,
        "registrations": [
            {
                "regdate": "2018-09-27",
                "balance": 4213
            },
            {
                "regdate": "2022-12-21",
                "balance": 4759
            }
        ]
    },
    {
        "studentno": "284-32-4852",
        "name": "Deeann Santori",
        "collegeid": 7,
        "registrations": [
            {
                "regdate": "2017-03-05",
                "balance": 779
            },
            {
                "regdate": "2015-12-31",
                "balance": 2814
            }
        ]
    },
    {
        "studentno": "774-30-0816",
        "name": "Bartholemy MacMeekan",
        "collegeid": 5,
        "registrations": [
            {
                "regdate": "2020-10-06",
                "balance": -3183
            },
            {
                "regdate": "2016-01-28",
                "balance": -5
            },
            {
                "regdate": "2023-03-19",
                "balance": 2689
            }
        ]
    },
    {
        "studentno": "545-99-1583",
        "name": "Shelagh Pilfold",
        "collegeid": 3,
        "registrations": [
            {
                "regdate": "2021-10-23",
                "balance": -849
            },
            {
                "regdate": "2020-05-29",
                "balance": 4729
            }
        ]
    },
    {
        "studentno": "757-53-7947",
        "name": "Wernher Bodd",
        "collegeid": 3,
        "registrations": [
            {
                "regdate": "2022-01-01",
                "balance": -347
            }
        ]
    },
    {
        "studentno": "373-54-7011",
        "name": "Adelheid Rapson",
        "collegeid": 5,
        "registrations": [
            {
                "regdate": "2019-04-09",
                "balance": -4084
            }
        ]
    },
    {
        "studentno": "511-44-9551",
        "name": "Leanna Sansbury",
        "collegeid": 1,
        "registrations": [
            {
                "regdate": "2020-06-10",
                "balance": 1997
            },
            {
                "regdate": "2020-03-06",
                "balance": 953
            },
            {
                "regdate": "2014-02-08",
                "balance": 4373
            }
        ]
    },
    {
        "studentno": "571-24-6316",
        "name": "Deloria Jorez",
        "collegeid": 3,
        "registrations": [
            {
                "regdate": "2022-11-24",
                "balance": 4355
            }
        ]
    },
    {
        "studentno": "430-18-1143",
        "name": "Janaye Lackinton",
        "collegeid": 3,
        "registrations": [
            {
                "regdate": "2020-05-22",
                "balance": -2678
            }
        ]
    },
    {
        "studentno": "865-21-8600",
        "name": "Andras Credland",
        "collegeid": 3,
        "registrations": [
            {
                "regdate": "2021-08-24",
                "balance": 3901
            }
        ]
    },
    {
        "studentno": "574-48-8715",
        "name": "Geno Febry",
        "collegeid": 6,
        "registrations": [
            {
                "regdate": "2015-02-07",
                "balance": -3353
            },
            {
                "regdate": "2019-03-14",
                "balance": 1260
            }
        ]
    },
    {
        "studentno": "373-06-1385",
        "name": "Correy Gateshill",
        "collegeid": 3,
        "registrations": [
            {
                "regdate": "2014-05-25",
                "balance": -3478
            },
            {
                "regdate": "2022-10-08",
                "balance": -575
            }
        ]
    },
    {
        "studentno": "499-68-6892",
        "name": "Reginauld Emanson",
        "collegeid": 3,
        "registrations": [
            {
                "regdate": "2019-02-02",
                "balance": 2600
            },
            {
                "regdate": "2019-03-18",
                "balance": 1607
            }
        ]
    },
    {
        "studentno": "609-56-0574",
        "name": "Jud Hallstone",
        "collegeid": 5,
        "registrations": [
            {
                "regdate": "2022-12-04",
                "balance": 3476
            }
        ]
    },
    {
        "studentno": "551-31-3401",
        "name": "Chrissie Walsh",
        "collegeid": 2,
        "registrations": [
            {
                "regdate": "2021-08-07",
                "balance": 950
            },
            {
                "regdate": "2019-03-18",
                "balance": -3914
            }
        ]
    },
    {
        "studentno": "282-35-4100",
        "name": "Michaeline Bissatt",
        "collegeid": 8,
        "registrations": [
            {
                "regdate": "2017-03-09",
                "balance": -1723
            },
            {
                "regdate": "2019-01-22",
                "balance": 2779
            }
        ]
    },
    {
        "studentno": "769-11-2376",
        "name": "Valentia Reinhard",
        "collegeid": 4,
        "registrations": [
            {
                "regdate": "2014-12-15",
                "balance": 1622
            }
        ]
    },
    {
        "studentno": "336-38-4923",
        "name": "Kalinda Kilcullen",
        "collegeid": 6,
        "registrations": [
            {
                "regdate": "2019-05-17",
                "balance": -3497
            },
            {
                "regdate": "2015-05-10",
                "balance": 999
            }
        ]
    },
    {
        "studentno": "816-56-9616",
        "name": "Tally Sharland",
        "collegeid": 4,
        "registrations": [
            {
                "regdate": "2023-09-22",
                "balance": 3708
            }
        ]
    },
    {
        "studentno": "156-10-6031",
        "name": "Elisabeth Dounbare",
        "collegeid": 3,
        "registrations": [
            {
                "regdate": "2015-06-26",
                "balance": 1722
            },
            {
                "regdate": "2022-09-06",
                "balance": 53
            }
        ]
    },
    {
        "studentno": "342-78-6842",
        "name": "Christiane Minelli",
        "collegeid": 6,
        "registrations": [
            {
                "regdate": "2019-09-27",
                "balance": 4895
            },
            {
                "regdate": "2018-11-30",
                "balance": -212
            }
        ]
    },
    {
        "studentno": "442-67-2980",
        "name": "Micah Hearnah",
        "collegeid": 9,
        "registrations": [
            {
                "regdate": "2015-09-06",
                "balance": 3842
            },
            {
                "regdate": "2015-12-18",
                "balance": 4966
            }
        ]
    },
    {
        "studentno": "742-94-3403",
        "name": "Adriaens Gingle",
        "collegeid": 6,
        "registrations": [
            {
                "regdate": "2018-11-30",
                "balance": 2370
            }
        ]
    },
    {
        "studentno": "691-25-0118",
        "name": "Dilan Copas",
        "collegeid": 5,
        "registrations": [
            {
                "regdate": "2014-12-12",
                "balance": 2722
            },
            {
                "regdate": "2018-06-28",
                "balance": 4954
            }
        ]
    },
    {
        "studentno": "492-73-0091",
        "name": "Elysha Malloch",
        "collegeid": 2,
        "registrations": [
            {
                "regdate": "2022-01-22",
                "balance": 3311
            }
        ]
    },
    {
        "studentno": "737-03-6523",
        "name": "Maison Bourdon",
        "collegeid": 9,
        "registrations": [
            {
                "regdate": "2018-07-05",
                "balance": 1968
            }
        ]
    },
    {
        "studentno": "452-31-3468",
        "name": "Angeline Moulding",
        "collegeid": 3,
        "registrations": [
            {
                "regdate": "2020-03-22",
                "balance": 4352
            }
        ]
    },
    {
        "studentno": "814-92-0022",
        "name": "Augustina McGinny",
        "collegeid": 5,
        "registrations": [
            {
                "regdate": "2022-03-21",
                "balance": 873
            },
            {
                "regdate": "2018-01-22",
                "balance": 992
            }
        ]
    },
    {
        "studentno": "230-24-5684",
        "name": "Valentijn Rourke",
        "collegeid": 9,
        "registrations": [
            {
                "regdate": "2015-11-28",
                "balance": 1246
            }
        ]
    },
    {
        "studentno": "428-43-5649",
        "name": "Ernaline Weyland",
        "collegeid": 5,
        "registrations": [
            {
                "regdate": "2016-10-07",
                "balance": 2878
            }
        ]
    },
    {
        "studentno": "806-66-5670",
        "name": "Wolfie Hartrick",
        "collegeid": 8,
        "registrations": [
            {
                "regdate": "2021-01-07",
                "balance": 1633
            }
        ]
    },
    {
        "studentno": "437-50-7577",
        "name": "Vincent Ferier",
        "collegeid": 2,
        "registrations": [
            {
                "regdate": "2020-05-30",
                "balance": 4498
            }
        ]
    },
    {
        "studentno": "633-70-1010",
        "name": "Estel Attryde",
        "collegeid": 1,
        "registrations": [
            {
                "regdate": "2023-04-06",
                "balance": 1835
            }
        ]
    },
    {
        "studentno": "500-09-7021",
        "name": "Kristi O'Carroll",
        "collegeid": 8,
        "registrations": [
            {
                "regdate": "2018-01-26",
                "balance": 2414
            }
        ]
    },
    {
        "studentno": "767-35-3434",
        "name": "Levi Vereker",
        "collegeid": 4,
        "registrations": [
            {
                "regdate": "2021-04-05",
                "balance": 866
            }
        ]
    },
    {
        "studentno": "273-10-1823",
        "name": "Ettore Figge",
        "collegeid": 4,
        "registrations": [
            {
                "regdate": "2016-01-25",
                "balance": 3029
            }
        ]
    },
    {
        "studentno": "595-77-9545",
        "name": "Zelma Sherrard",
        "collegeid": 8,
        "registrations": [
            {
                "regdate": "2019-03-16",
                "balance": 2435
            }
        ]
    },
    {
        "studentno": "767-10-4438",
        "name": "Palmer Bordone",
        "collegeid": 1,
        "registrations": [
            {
                "regdate": "2018-02-28",
                "balance": 4049
            }
        ]
    },
    {
        "studentno": "889-76-9909",
        "name": "Ysabel Holtum",
        "collegeid": 3,
        "registrations": [
            {
                "regdate": "2023-03-09",
                "balance": 3576
            }
        ]
    },
    {
        "studentno": "411-29-9456",
        "name": "Bernadette Bielfelt",
        "collegeid": 1,
        "registrations": [
            {
                "regdate": "2023-01-19",
                "balance": 561
            }
        ]
    },
    {
        "studentno": "269-79-3194",
        "name": "Nollie Clappison",
        "collegeid": 1,
        "registrations": [
            {
                "regdate": "2019-12-06",
                "balance": 91
            }
        ]
    }
]

export default testData
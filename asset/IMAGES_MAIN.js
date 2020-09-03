let { readImageBase64 } = require("../lib/CommonFuncs");

var raw = {
  // 启动
  sign_enter: "iVBORw0KGgoAAAANSUhEUgAAAG4AAABvCAYAAAANB/VeAAAABHNCSVQICAgIfAhkiAAABDNJREFUeJzt3NuSoyAUheHfvP87OxdTTmUSExX2ae24rqa6p4TwNQYEXICVRlnX/Y+zLEtwTXzzyK6AZT6hHf1OMW3gzsB0wmsBdwWkC5483AhEBzxpuBkAdTxZOIuGV8aThLNscFU8OTiPhlbEk4LzbGA1PBm4iIZVwpOAi2xQFbyF4s8qRxvy+dnkyDWqP9ss3eMs0KLLjkpZOEu0UcjKeCXhPHpaN7xycJ63x054peAivtO64JWBixyIdMArAZcxelTHS4fLHPIr46XCZaLNXisbLw2uAtrsNTPxUuAqoc1eOwsvHK4i2mwZGXihcJXRZsuKxguDU0CbLTMSLwROCW227Cg8dzhFtNk6ROC5wimjbamK5wbXAW1LRTwXuE5oW6rhmcN1RNtSCc8UrjPalip4ZnDZaJFzqAp4JtvzqqFF9eDMzz3d47LR9rKua0gPzOx5U3AV0Z4TAZiFN3yrrIR2ti7efzCRO6aHelwltCuJuoVeyWh9LsOpoj3HCzDytnkJrgPac5TxTsN1Q9uiincKrisa+NXRG+8QrivasizudfTE+wrXES0C7LW8kRy1/Ue4bmjRYK9lj+Sbwe4EXA1N5VWHlu361uPU0D6lWn3Atuf91+NU0bZ6Z9fjbCza+R+cKppqZtv7YXGRO9cze9tc1kG1G80mYQ+Z4UazTNiyzo1mn5E2TT9KfGcsN5xowhZSLXNlIdRz1dvq2kMLqSP3V8VX646+Ld27fqP7VB7bPyIKtLxGlUHSTD1mNhc9Xn/gXbBFRl4BVeltDTC/I+xtdSD6pZzP5Xlvkt27/qefe8aijd8GJ9E97/VNrla34AqDqL1YdYzdUWUGnudCZxVEy7vZx+lA5nde5kjTc+pwNd8Mvs7jMvBme932nTV6ncwt8lfqcTgBr4Y32ghXPkf2PPVMXU89OakyVThzzat1/fT/v5V1dvDjOUI//cjLC+/Kh7O+jX273tHvjuriPa26fMwqep6nmIg2ClmPqzIcj0jUH3bYCvgv4JU/2DhaYGe86K+QqYXUG+9vMr73p1fAfx0va7BmsnXhV/EyR9hme05+DS97WmS6WehX8LLRwGGXV3e8CmjgtD2vK14VNHDcV9kNrxIaOG+I7YJXDQ0CdjKr41VEg6At6Kp4VdEg8OyAGl5lNAg+9KGCVx0NEk7rVMdTQIOkY1ZV8VTQIPF8XDU8JTRIPthYBU8NDQqcSM3GU0SDAnCgdT6vAhoUgYN4PGU0KAQHcXjqaFAMDvzxOqBBQTiosd19pi4RKQkH9nid0KAwHNjhdUODgUMfGYl+0FwdDYr3uC2RDamABiJwENOgKmggBAe+DauEBmJwUO8NQVmRgwPbhlZEA1E4sGlwVTQQhoO5hldGA3E4GANQR4MGcDD2GkT1tICDcyBd0KARHIy/cEYxreBgH6gbGsAfgzrG2GckieYAAAAASUVORK5CYII=",
  text_arouse: "iVBORw0KGgoAAAANSUhEUgAAAKcAAAArCAYAAAAdZJhPAAAABHNCSVQICAgIfAhkiAAAA8xJREFUeJztnV1z7CAIhmNn//9ftld23FTl60Uwu89ML840QYMIgtpTruuq18HUOu5+KcUkR/q+B6hvO5Wf6A5kpdY6NY5d7WcGrZ+RvBdMupLWIY03QCknuyFkYqWr/nec8RzJqrX+vRtinFSnvuxlNB6jsZiNG1emlFcmr2Hxoj3RRk55EKmH4bYlkUeNe/SSppQSH9a1ZE0W7v1qil55GGvyZpWXlY9PiFYDjRpkqZeyeq1M0VBD6Jpzxc5ZjzbMk4xi5c3R7cyg2n+1lzUdnTUslYUKayjDHumEIxsx4DsN/P5N3LYl73GTrRF/nhNlaE1W9JoQmXQ0ed595+osm4eWTkrus+nC+gjux0iSDs3k8TJQ5GSWPK81cvTEn5E+IfIotFtkat/dETEkSzSkXr08+XbjzBaSeu4GtFrqoLfuOP1ZPXvvV/T2KwVnsh4R1pFIw+eurHZEZuPiYokY6Y2z/zivTFirwBMK3tF9tIxZeuPs4SQOGmVY16DZDfRUXNacXuEoujw14wnh14KX/sM9p6VIy5H1dCwRIzumU0mIOtns99HeMAtW49uhx8eUkrggP9gyQKWUtx8PnjwRV1WQkU77f4eHdS4cY0WVfVbGMmqDMq4nG9916bx7Hx1n+jnGOGdwB/6uwGyHTZ6K9LjgP8+p9TjIwyJc2Ss8Dh984bGavJKrHG93iCjXqvEYGU4lPYmIOiyqCmB5X50Q7fQ8HEPfedghC6j7Qiu52luUFpq8pXHuuMJgoT/kMCNDPymkh3W9npnhXa2YkbaU1KM96u+tTInn8vDaUrncikc0ae8QRRARurIyO5gtTZo5a1ZK7yrjjJhdkdt0n2KYjVkWzeW+ZpUsW9yL8J6D+eS95KdguVbzVkqyNhBF5CFgKdSEQtSLM6wVUTQDFSdEJykh21WFke6oevEnM/ScTyug7zrlJN3/p/qk3au2YPkjCGiOKCWNyOQRG5J9fq1hrt6NjBTIOuh0zXmC10RfxdiRwEngjAG1Z404sG3Z9pzJpJ7teTNO1CB5Jised4iQ9P3wPrzCkWNxKjsn7ai/r/svOYIodhtmT5YsHq2zWTIlOZKWKfo17v3vjZS8ppHlgyShIYuBUnD7qD0BNmrPazyl+uY8P02IIjb6R6wW+dwyTJZv6UEYpuQZDZF6q7X+T4hQ5Qhvz4UcNGRJh4PHAQzUmpuqxe6MSG+eM5t3maHtp7QIbn1Pi0W2paifbfzJv8+JxLtI7ImkeK6Vj5RFXcK7PyOJMqP3pLkLp+1yXb7/g5vngH5Zc7rufwFSGdt/JNkKowAAAABJRU5ErkJggg==",
  // 主界面
  sign_dismiss: "iVBORw0KGgoAAAANSUhEUgAAAC8AAAAvCAYAAABzJ5OsAAAABHNCSVQICAgIfAhkiAAAAW1JREFUaIHlWssSgyAMTPj/f04PVseOGPKOTvfUUdzdIEICRQAg+ILo+HkAES/XKiDxMrjG3PVMSL0MrnEHVl7O94fEOBE9MsCxaDd9KAsafiLSmdcKZPOqzVuFMvhM5j2CkTxm8xHwdsDwLEIeca9xRNx6vjqACOMAAAiL9EBLuEKkxuBuaiBd7KyYefvp+QiRO6GMtzqdbaIzyazhmDJVnnOhzO9oOmzOJrogefus+R3VQUiHrWjYVFZTGi3xmK8IQKuh+mAzA7Bwq2ebjACsnKapMjIAD1drSuzthFbzXry7GOkQjeJ6xO6BlVOUHnhFNEhZYavyG42OyHx1YibVW5rvSoslurdjPqoUzCgpd0x7PlLQu4pyXi7mM3oqKxsN27cBWJuM5l8e61iJrW04TI91vNCYigwAydnlVjNhG60ego5nAYzHOlHiERz/VQa+tgB/7dbHkzadEHGbbSoWFw3UxQj3QMe/PqR+Pv+zyU1czYSMAAAAAElFTkSuQmCC",
  text_supply: "iVBORw0KGgoAAAANSUhEUgAAAMMAAAAsCAYAAADYbQz9AAAABHNCSVQICAgIfAhkiAAAA1JJREFUeJztnNuuxCAIRXXS//9l52EySWMUQRE3LevxtEcdZAteak4plaREKe2ics5aVTyeng1XufeBVh2z/dqqf8VHtMq7plvghF3OJQFpMECwByofrYIoI0cHBH8sogL1dwoVMXAqDkEE1kh9bjlNklRYSoFKGRCh7HO39f+92v7I9rWKCrMsiWE0YW49D0GcBcn5LJD427QYOCtHOeeuIOp3rdhdp0eHscByBal+xhWEeM5QShF1ODfsBwGXXX4jEsOoET3HD0G8G25UWPGFOiOZKZudJs0K4f58tAwWc4kfK6tz2umIFf92j1IarmBa/jYqexgZRmlRzplt7NF7ESWex4w4ez6nccKB8jFSDNJowHHmkXikc5LAF9wUhutblC/1nvXKaoqB45C9xkrCGEWIwj9a/bcSESSC+NQvcEd3quDZclq8XRD/SFrbqv5b771TrEyatQ8VUoK4l39JKpQamrO+S23Q3cuZqT84g9Z5odH7mpEn55w+GkLQmv2PiNTp+XAGxx2UUsZLq9KVopUjGNTyq7Q9QRvkwcRCCD0fyznTq0kzjsfNz6j/n9m8C3BY7afd/d+af6WU0tVSisaPofJGySqA9nwBeWR8IrNLqXcfGu0uz7ar9sWr90CrMo1yAn9IljRPZQJ1+VfvgVZlns7be0HbhtzyVgc39KMiap999tgR4gJ/eEhPm6tJuxqudfT7jVituVuC1sewt2Ps2mjz/nHPSQc6eTWMtl1b9cOKIfjB2XdBjgqzxy20j2RwgBYDWhg9DXfVBUUcWscyrIAVQwjhh1c7oDo8RVMMVh2g8bFGgMeqEFaOZrfgtgc2MgR+kcxjkAa+Y2KIqMDDY7pBgdy/R8QQQngPnvp0+w50TQjBPxrfuiNiGhmeFvKtOL1BRdXhzeEpzCNDiycZVBt02+wQ3qlB0ywyRHoUtEDKFkzEgCQEJOO/DXTbbxcDugHQ0f7oypKVvj/xu7eKYXQtZcBDc0BZPdi3cg8sl1P3aR3ZZwghYHE6+qD4wzYxIM0TgjGzI22rP71e+bNFDMhC8PhxD+I+gxSEvh+hLgbEjgj2MHvL4u66a7g+qb7pFheA4aNxVOKJ/bklTdp1AdhKW7zWp3mroUbZT+YLbTomu310R3QAAAAASUVORK5CYII=",
  sign_lv: "iVBORw0KGgoAAAANSUhEUgAAACsAAAAcCAYAAAD4IkbVAAAABHNCSVQICAgIfAhkiAAAAMNJREFUWIXtl0sOwCAIRKHp/a9st4aIfEUTy9IUOj5GjNhaa0ACEekSG4N0cw1tzcddcUOExUYIWv+zjCzXykjeXTYA4K3gpcvVP4qstLk0savo9nWPIavZVKrY7DFG65WQlahprXKMDTSRLjbLCqM6ZWS5Vlumxd02AIhbgcsvJUtbbr0wlon10p3llXs2cv0uFTujNBItdWPLNPDS/UdXH9qDpvnuHS162lTxcEwjm/WEmUWJZyXq2q7cecC89Cxe/wBCxD1LCnhzSgAAAABJRU5ErkJggg==",
  // 主线章节
  episode_1: "iVBORw0KGgoAAAANSUhEUgAAAB8AAAAWCAYAAAA4oUfxAAAABHNCSVQICAgIfAhkiAAAAJxJREFUSIntlkEOwCAIBMH4/y/bUxsQFTSrPbR7siHsgEhSJqJCQqWoTyVm7sZaqr3q/BwF33GvAM9DKo2SWqCR+QxYwWvoDZZnDzI7ljwyW5EswPNtdu6ZomTgOyBheFSIUSXkvKfhr5F/+DfhJ/fawFcTEUUb+Mm9D3e+o6hEZK/QA6HeSe4FVjqN/AlJPdce7Qa5HWrmnjF6LS8VETo0Rh/KSAAAAABJRU5ErkJggg==",
  episode_2: "iVBORw0KGgoAAAANSUhEUgAAAB4AAAAWCAYAAADXYyzPAAAABHNCSVQICAgIfAhkiAAAAK5JREFUSIndlkEOxSAIRAfT+1+ZLhoa7UcEC2nyZ6dlfEUjQgAYnZiH4SAimn5beZ9+EvDKtIJ7/bJGc0cbAG2OiMwdOjTj0xDNRhv3azDzBbaMMvfm7DW1SDaiHc8P+PUKfwveOccUcLYGcHZWIu26NiugUuVbPStOpWCrIrrB0WNYxZdkPHs0SsEeKAC0nZco8ibPYl0Ze34mAgWSOpCd+/9ZybwbAa1T6JVdTk9p61cnjtxvjwAAAABJRU5ErkJggg==",
  episode_3: "iVBORw0KGgoAAAANSUhEUgAAAB8AAAAWCAYAAAA4oUfxAAAABHNCSVQICAgIfAhkiAAAAMBJREFUSIm9VtsOhTAIg+X8/y/XB7NkQxiXo/TNaKEFhmMiAi0AtscNzGy+i/BlDF6Te8STgAhXxhgnspYom+QUYzzeCJIV4CRUciw+30J2NxHHEUFejIdzU2UhmQe17F0YmQFakeVpbWtxbgn9dSabmPPzSXIv6UTrwAHYqvKJc+lQtgFA38BpWxIAjeryeGPptPbcHbjq0qkg7NwTFRGt/liy/bOmOVs19aj9U/oodztqUffad+UTQy9eILN3wAtxB15C+NEsPwAAAABJRU5ErkJggg==",
  episode_4: "iVBORw0KGgoAAAANSUhEUgAAACAAAAAWCAYAAAChWZ5EAAAABHNCSVQICAgIfAhkiAAAALJJREFUSIm1llESwBAMRDG9/5XTjw5DJWxWvL8ONjtZRU4pSeoQGT4Hcs7m2ApNs2oVtDgyzqxpBlBxxsSKxxr4t7svLCJQHIjZok1ks2Yo+ykfXlNoVLABTwFPRycD0e3f6dEdsPD+JaEGmM0c3gFP8VAD7AEVYuDkHDFPwhOQbtQ51/YAymQg+rLZQUfQ58xcTOp7wCMQRend3C6mYUZw42mm0SJARaMvq2EP7MRvPFReQOJMJzW7AeUAAAAASUVORK5CYII=",
  episode_5: "iVBORw0KGgoAAAANSUhEUgAAAB8AAAAWCAYAAAA4oUfxAAAABHNCSVQICAgIfAhkiAAAALtJREFUSInFVkkOwCAIBOL/v0wvbYMUFQhabi6zgAZFAGAQwdwNu0DE4doKa3FRBBwh98QrbhFbmVYaaBahFEXElODqiACgL7uXqCr7j7jHcVWQN4vKm/6KhxGF0bJAZp5WY1QJiTmeuTS1VXxUmcdAuuxeoWdeHwMznyu7Ze7X254WzzQjjaGTHU2HO/OKfq45PuJZkW3tdfbkyvWZAfO/APc3KvoFWhF7OEgOMsIRrN5P1mREOGpA7rsA+vFTNQo6u1YAAAAASUVORK5CYII=",
  episode_6: "iVBORw0KGgoAAAANSUhEUgAAAB8AAAAWCAYAAAA4oUfxAAAABHNCSVQICAgIfAhkiAAAAL9JREFUSInFVkESxCAIC07//2X3sGPXAmK06uZWhQQEKwIgo0LOj88HRKS5pxHxFC6pxXsObAAMDwCkyMET6hGzwgB+mddOjOisTbETkW/mI9GyiMpT9lLTYoAMmEvAiI909FvQmWusuJLXjnrXiJrwOiWq1+9uPyWsbbZlDtja66C2ZO4Je2tbxNluTyfvtRGfdVwRtBFfce+Hn9S3hDMnkTzHFULUYALnPe86BeKtocRdx5/GKPN77RGzdWV5Pm/+Yix0SgKDAAAAAElFTkSuQmCC",
  episode_7: "iVBORw0KGgoAAAANSUhEUgAAACAAAAAWCAYAAAChWZ5EAAAABHNCSVQICAgIfAhkiAAAAKpJREFUSInFVMEWgCAIG7z+/5ftUj1NlGVBu5XCxgAFQEGFUprPBiJi/p/FeNAnid4QuQKs5FbF7D0WgqMFdWKGeIXUyqHWQQbOAtS51wWsYlRkJ+AtEYOag3bgjidtm82X/tH/RkA0gVdguIAa1nyFCmDam+qAKSBj7YDxev/vwGqg5xy73p2A7HeBdiBKmAK9nR7Zl4O7jQ6yWnG1gK3q67VtZsBLHvFm7Ex4QStYEs03AAAAAElFTkSuQmCC",
  // 物资筹备
  tactical_drill: "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",
  cargo_escort: "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",
  aerial_threat: "iVBORw0KGgoAAAANSUhEUgAAARcAAABBCAYAAAD7c+CKAAAABHNCSVQICAgIfAhkiAAABNdJREFUeJztnduWrCgQRLFX/f8v1zzMqek6jiIJmUmgez92W4hcwuBispVS3iWQ97ue/LZtkbdfBsrJl1p57svy6No7lvdZmUQ9609IqgauOhVAJGft7/1+0zYHeUXfYNs2KgkkaWmXn2tG3u6e7X8lRzXduZSCe4E5WDoqbdSOhLgAzAKBiSNFXFoqkIqDWWzbttRwYxVwLgB/QGB8eSk5hqy80IjgjE/beMrydCQ4FwAIIXwpGp6BkgO+ojev37/zcDG1NFYqzzNwLgAQAs6lAYW3SEYemFNYk9G20fP7lraCcwGAEBAXAAjhdFi0ukVWGMoAPBmcCwCEwIQuhDPDBVviuUAM7s7FIw7GJw2GNtALAjIfV+fyLQa9cTD2guIRTwNAEa+XZ2vfsEaiG82fm7jUInp5CIOqyHjlJyvMJW7Qr01CnWFxaY3m5RV2QVVk4Bo+TH0WQ+Li2VisaSEyEAlfRY/TNaFrnWyNrBQmfsGb2hAf2jE5l6hvEL6vG/li9ftevGUAfpkhjK/IEJQ9HXxEZBgqAehQdS6ZonKWBiIDFlaqc894Lvvrs8qhFuPmUFxGLJT3QyEy92HEJSvUoUIejjgqs+jl9pb++Je4KInKWfqIzH1RmDBVyMNd+CllfMUls9OqnHwHcAci++7PqKjMcAOcM/MsqOs12GvJT2/FKVS4VWQU8gzHRLhKz/qm7fzSWhbmTXSKrqElT2p5hjai6u1sEnQ1lCfAX6X8m5GsD+ciaXkOmIPHcR4trNBO78z3KtV/zuWsUhSdSo2j/K6UfxhDfXg1g1llchlDd0Un8BEYPq2HVlZs5+r8JS77jrh6gWcIS1YZrV4X8H+izhtSeaESoBsez1Pj7UZPliMukEJWJ72zGKhxVdZE/4c0LMPuq4bbOqSYvYIYde/WIdHMZ0dcIJSe4M9ewnLFHbZfKFMdFlG4sBJPaa+rTO5fOpfVotuDPgqu5YrZc0SRUR9brvVYyWJCF4ZReJOu9nLq3ZxqKeuMeqk9A3Mug6zm7GYLwcj9Z+ddGUVxxbmAFGexhUaGUtaOp9hRPcl6PsQF0rBa+s/1OJZfjoTh6G8KZcaw6GHMfCv37DnJXgioTbCqOJpVvvtDXBpQaVR3YJWOcYSSwJQSd4B8Tz6OygZxgTBqHfH7fzOPsLGmt3qw96h8H6XLnAsM4fGWzFiWbcmD971XdGeeIC4gw2yBybr3rPOEst0W4gIyjITCrP326Q6iFD9hsaSDuIAEHgJwJDKt6UZvt89ATWCZ0IVuPCx4ZKN/kmPxXLL3KjfEBaZgacCWlaXRY39VN6StCMMiSMV6dLDlJAelPTSZeVCNOPBSqIhScitDbay8IpYhkfeqypGIeEWci94op972PPshzgUkaemE3/tjRtzQHpUXbgtW1/JxjhknTjLnAmZ6TkG0xLyNxGuiuZZOVsyVHmEZube1bnAu4MrVUKb2u55dsr2ORWF4kh3bhk10II23dc46LlhBTDKPGVZ4XsQFTIw02r1zmB2ntvf+XkMiz/tG03NvxAXMjHRWT1HxGGrN+LI6+j4qz7SVUtaZGr8xqnsVauyXghXy8SHiK2dLuvv0Rt1Oa+wWS9iIFoacakFcJFD6mtWCSnwTD6GLEPiW8hmt+9E6iNrb8w/WMr7/n2tEYAAAAABJRU5ErkJggg==",
  // 剿灭模式
  lungmen_district: "iVBORw0KGgoAAAANSUhEUgAAAKIAAAAkCAYAAAAKG+HeAAAABHNCSVQICAgIfAhkiAAAAmpJREFUeJztnNuywyAIRbXT//9lz5MzqccLKBuVsF5riZctKCbGEEIKDFL6LR5jJJXtleNCrUNZTgrJtjzh9K01vijDZaemlKADWNpGiVATZJ9l+6fwQRmudaBUw5G2d/ImD1gCE2IIbcFIiOYtg2ZhglGAheZMFoxGqH7aRK5JLbNrgrOEuLKYjjGKD2jNJnpd1QMl2FW71P7YGWWgobkE0dC3hGjrwENzyapwsnd42sme0UV5JpQ0XkyHLYCoeclRWWlQOdHWM9DPqj2vl42YrQe1TaqhmcJh80KV0zz6cyxmxoUzsY4TonMuyE3TcUI8zSu8mZWDA+4y6ssZ+JHxN5+VWqWVIsu/1ZjxnMd5ROc8OIKb3XCR0zcIb2c95SKx8ZqxgcrXtoTXOj3j1EU9j5jJlV5NDzh69I5re+UpbAnNt6VobqsvGoTT2OYRn7zFG47aORvadkyU0bsD3DFV94juXdrcNiEl60sSotRGRfsIy8HScypch6PmEV2EdqC+3MwR47Y8oovwTrg7ZKoYh0KUCMu+LrTBSIQrYoR7RA/JNqB6wlkxdoW46slchPfTWw82X3KdECPLI66KyEV4Fyt5Qq4Ym0JEfOjk3MHIC65+jFWzXRWidEh1EdpgZhyp/xHbrKwefPvO+hxqYybpiGq2/p01c72h5Hmjv4nTR3OySn8ZObLz4xE5IpS6OsShoz1BNZ/3DYEXVhHic0HLcWs0+XJEMArDM9d/uAh5IC8T2DkWzfcRuffatOA27tYZXQPVFkt9lKkKsZcx7914gLhoSYtb622FT3mHDCVj3it3a77Rope5iT8qI2qSUV7UEAAAAABJRU5ErkJggg==",
  sign_defeat: "iVBORw0KGgoAAAANSUhEUgAAAGIAAABiCAYAAACrpQYOAAAABHNCSVQICAgIfAhkiAAAA4lJREFUeJztnduSqyAQRRtr/v+XPQ9nuipjEGnoyxZ6vU2S8dKbBRiNlvM8TyKiUgolvvyWnoiIjtqLiT3Xev/cvZmG6HPX2EspdNwVPA3RpRUC0cWI1j+nIWP0NuiDqK/IaYiM8zxFNWsaUVs4k4Z8I22snzU8ai9arHR1ZkIgIipE9GcJIwXe2Y7RBnmtmahretqYnQKZ6RFqdVIJgtkhEKsu+bi+oFHEVccPjf26q+9XEK0PS5BO39Cx3pdqEMlfPBrUbRBa/fxKVszSqqmLEW8OQ2vbnxp2M4iVZz89eDYgtzHizVbM0tOgH4PQtOJNYXhva86aKmiG0NuQu4LQtgLZjKhtSyMMkTTgr29fW2i3FqRZWfS+iYzQLhxyF+WNyAgmuvVogrIvQ2NEKWXbaW2LmZoMGfFJxFRPA7Ttnp41adrxRjO09n3aiCuWJ0808PoSTwrkcQS6GRYNRd0IBs0MVBMYSCMYNDMsu0wzI5hoM9BNYKCNYKLN8JhWmxvBeJvxFhOYVxjBeJvheYDpZgRjbcbbTGBeZQRjbUbEl5DuRjAWLTd6hjaD6kXIEaB9eTe8bgoygomemjLRZwtfOUZoEx0CEYARTJQZCCEQbW4ESghEQEYwXmYghUC0qRFoIRABGsFYmYEYAtFmRqCGQAQcBHLRLIANYjdgg0A54vYCNggLkMOFmzV5FAtx/NnKCAbRDBgjIoqDZMaWRjBIZoQbgVKMaDu2NgKJ0CCQzjFH/9o1LAjNEKK7FQ2Gx4inG8qO/K8E6xsHP+3HzP7XUDfiqRBI3ZEFo/s3FMToyjxC0PopWWvMsBhL8u40ILhcYBbRHfHnZ9ftdedOcyOiTUAeTz4xMQLtMshSCrwZ2xxZo/8WHDYI7dtM8DJRgQ3CCtQw4IKwMKG2DjTggvACLQyYIDxMqK0TBZggdif8p1vRrVLrCHyWNAKE0CCibfgkeltCuybtkyuz640EsmuyLJRHCCPrEAeB2JpWQBREhtCPtFbdQWQIciQ16woiQxhH9PRejQUl9/TUsHld08p3A0C7+vw2CK2Hoa6M5gN2q0HkE3z70arV1xiRIcgY2fdajY+nD1hsyGpohHHcvWG1AasyG0b5/3eGoMXwRcgZgi5ul+VnCM+M1Cj0qVsrI75omn6PI566qAxhjN66HtcXWh9O5PTW9bh7o2dBSR89dYU8VboiTw36H4OfrbvYrjQsAAAAAElFTkSuQmCC",
  // 关卡
  area_1_7: "iVBORw0KGgoAAAANSUhEUgAAAEkAAAAoCAYAAACy29cjAAAABHNCSVQICAgIfAhkiAAAAOhJREFUaIHtmcsOhCAUQ4vh/3+ZWc3EBY/yyIi0Z6dRgUO5MRBSSgmmSmw9EELI3t/Fbal/K8lK+kfDb+InyWLKXIAFtWjWpN1ZVRtrtfda0sKhfCcg3i9KnL4cc+O7O3GSCOQltVIEiEtiBAHiklhkJbEpAoQl9SApqSdFgKikXuQk9aYIEJQ0giURSEkaWWqAmKRRLIlARtLMds8jO5OjHV59QsN+TyZJM0hImt1ZlZA0yyM1aZfTXxbZJPVMlKykHiyJ4HhJK84Mj5e0AksisCSCOLpmW++97V+ohpNEYEkElkRgSQQfodM3Zak4CiQAAAAASUVORK5CYII=",
  "area_4_3.1": "iVBORw0KGgoAAAANSUhEUgAAAGsAAAAoCAYAAAD5cwTOAAAABHNCSVQICAgIfAhkiAAAAcJJREFUeJztm9uSxCAIRNGa//9l9mHLXI14AUXlPKcSpttGoxmHiAgEzjnqEgAAyLgVK1919a6jlmv9OTX/cm5U+vAeYtXUp4Gvup1zpG5Rs1qFkDZtNqO46n2ZxSlEzmhZFYkB5aUfwH3P2VLFyZEsSgQqIT1E3NkogMQCI5DbxsJ1T0F3bYMS/AB4l8BX0ziNitWIiGrTlvrttTV7+pI6ehi1G2JmGfyoN8tSdaLeLONEtVmWqjtJs0autLSu8kbiAehlphbhdk4VQEEb7Gmatb84h1m5YkibpiXFGrklq2T09kyapeqfVxssFSaYxmGctb800TkLEatEajHM2h9NcoFRaxiX8JaqO+RqMKSspj22XGtGvSnawSg1zVobL+ThY4yvg8YY1LnWyFTVDqZRqW/aG8xNWurzqxak7quVqmQ9KUlaDhKvASvMgay77isIohmWZM3KbIOL/TzrS4BV55GeDE0Wx8je6R2t20nxqgL25DDL2pR+PMBplNTOucGDf4rbshFrRslC/pmuZYciYPMVD+RqsDUtuxkldaaHiOB3E3Nmjk/RJEyzgcBL9QczKaTM353XnHUVubT/mkGy/AEgHceT02gRaAAAAABJRU5ErkJggg==",
  area_4_4: "iVBORw0KGgoAAAANSUhEUgAAAE4AAAAoCAYAAABQB8xaAAAABHNCSVQICAgIfAhkiAAAARxJREFUaIHtmsEOgjAQRHcN///LeFESsF3a2dK67bzEk4E6j50iRhWRXUD23T5UVdFTdwXJ8XpqsSigOWBxqwOJW33aRABxs0jzsmxVvQNQJW6WaWuRY9mJ81IsjtN2pkictViUL7kibXO4qhpJmgWS41YcK5rGFMeK5uFdFSQrjtNmUz1xkaRZeHMkxfGGcM+POFa0jOKqRpJm0SrHSRwrWs4hjhWt47aqkaRZtM6xiYytKLp2SkTPHK+oFb1+7t45NutN7xVMHT/iYjyRY4pn1RFbzRTiRmBWtQf/vI9acOJAqsSh06Gqx+sJrufNrdVqfVUVFce/lb7kNudoNazJwaqCUBwIxYFQHAjFgVAcCMWBUNyH2h8KKA7kDUCjgEGt7V1YAAAAAElFTkSuQmCC",
  area_7_10: "iVBORw0KGgoAAAANSUhEUgAAAGsAAAAoCAYAAAD5cwTOAAAABHNCSVQICAgIfAhkiAAAAWxJREFUeJztm8kOwyAMROMq///L9BAhRRGLwTZmmXdsA7gMYycpUAghXMAcIip+z5Hh5nQkZab1UPqtFnFy5zZeV4rhpxLRAhCR+aJMjanZ5pYEMzOjhdEcn4iSDttWLE9aUm3u2pRgd6qDXlIDz1SvPMnNQ/yc40TTmnWiUJoL9tuXWhr0rhFfShM0W6zX9cRbi0vFWUh/D9J5SF377tMkDZ4o1AjEYs2YUnZF3VmnukqrFJi9wYCrxhDnuVss3FSM55h3gzugJhZcZU+XWKhVPqg4C64aQ7NYcJUfuMFYCLFYSIHjaBILKdAXpMGFcP9bv8etp6ZekbNOnTQv2GKhXvmDmrUQ7jULqZQPnLUAcUGzxEK9qlPb7MKl1AbOWohusVBrxgNnKSJNhbWtEhBrISCWMr3u4mxAcn/OsqD37tXyVGTuZGNLrFuK5U3pkAFXnNTiQBo0QuLEXFuIZYj29mmkQWO4Jxs5wv4B1AOOaUbLt9MAAAAASUVORK5CYII=",
  area_7_15: "iVBORw0KGgoAAAANSUhEUgAAAGoAAAAoCAYAAAAWsW/wAAAABHNCSVQICAgIfAhkiAAAAXJJREFUeJztm0GSxSAIRGEq978ys5hxk4pKtIlo9Vur8dPSaMxXMzMh6blERFQ19CGZ1kLttyLniIxnmdcFGzE50YsxmmOF2l2YOz+rJ3AaUQvkEsH589MkM9WnlczGITSjKNIfiDjAalS2mtAKTra5eoBkFC0vnhDro0h4poXa0UZ2ZEooWt53QK2PIsUxLBQtzwdq8fLNxCYMnaNYm/yoqpiZy4FaMWRGfYC3TKhqtS1EKGYTliexXgvFTcQ33ON87H1UFnpu01r4pb6JvBSKm4g+b+NR2vecipuJJNQELgJSqE2YqlGztje6MTnVblvnLXdGcbe3DlWl9e0ChdqEpeeoU2tNBK6MYn1az7D1MRu+hTVqA8yMQmWiVWIoFIjWXRICCgVmVKze/7Yo1D8z2XDv+za7PG2PvI9Cr2qRsV1uGa/3ZtzzzK5QPEP16X28MhLDu7i0PhDIc+XTWBQKiJlNC1brf2SNWo33ev2pT41fo1eFewnN1twAAAAASUVORK5CYII=",
  area_7_16: "iVBORw0KGgoAAAANSUhEUgAAAGoAAAAoCAYAAAAWsW/wAAAABHNCSVQICAgIfAhkiAAAAZNJREFUeJztm0kShCAMRUmX979yekWVbSFTBgL931ZQyCeDiMTMnBwgIo/HdPE2Zesxjpj6OZZLezCRcVqTKs/NfbJgxwu1ShytZzNzIqIzhVopjsUYmDl91O4GTHHxqEiFhActb6rZo9SXiNKlZcRVlVQ0JCLl6/d7qBYT0UQaXbFe9Nqj1E6coyIk7ijUbCFdtGbFxL+FvBoathAJFS3krcQ6sqA834RpoeBNfWjZAx61CVNCwZt+8ah8j9zri87MQh8WCt40T8vzSjsSGeQoB5h5ODw+2w8JhV2IcSQ2u/dV8SiEPTuyWCgmnCkt6p7c1S0Uwp6MWtTJ12o2FnuUJOzNir9bqB35vPFmE1R9xrhuIUULe9HG4wE8ahO2FGq3HDXC29yWluenGLxWBGgh8qhTDL0DTaH+MXFHZMsctRPSzdgMhFLCOg1AKAc00geECkRNUAh1Q7ryJUepm2fWU0rVFpbHdC2wrFJ75zv6o0BPe3yPMqD1AjzzLy9CX2DungehjCAiUWrAKSRnZsQq9fkCd7q2WLWzcDgAAAAASUVORK5CYII=",
  area_ce_5: "iVBORw0KGgoAAAANSUhEUgAAAG4AAAAoCAYAAAAfWs+KAAAABHNCSVQICAgIfAhkiAAAAchJREFUeJztm0GSxCAIRSE1979yZjFll5M2gCgRDG/bGoUfkDaKAHCCkPMUNwUAAETsaq8dpwftnLRY2IKIcEgH10xA288Sb/PR8kP9OMvI8pyn3/aduY04izdzl7fdA03hLB2c4s3hK1X2OLaV+rj+q9Pl6vFHKfP/J5xUNMr4+rfZ0RXd6TWjtoiqynqwngGvbXdy/Go+EWeV4lIsG0QRl873xwGQlV5E2IjLaNNjGRBHRltMyIjLaLNhhl/JvcrEnruMx4mbwi1AsjxxG/OhhNOux5FT/p2AXTsnUdmhALva8ArhdqEWL1SqjAYidhUf0rWPPLoQeV3wRGuj/c63PZv4eBIyrxLP6oBNJDgfhEqVls73VrFSaRYgi5NhVlWsKZxjqGhO4YKSwgWFPRAbrRrTEs3OI9qEkz/YVLnDPt+O5BrnGPZ/HJcuZ0RdRu5cxBGndXx91epN4hW7R/xG8RFOUqT0TqLV/g3iXW2c4bcaRASEy43UGfcHJM/Q9vdeBY+eCJf67ks4aedRRoW3GnuUp+beXOMsDeu9OBINa98VHv2QarGOeuQJ3z12IHbnKGsxM7O0nsN+SC2dvH1ojMKI/yjf/QLay9Nr9uGwkAAAAABJRU5ErkJggg==",
  area_ca_5: "iVBORw0KGgoAAAANSUhEUgAAAHAAAAAoCAYAAAAmPX7RAAAABHNCSVQICAgIfAhkiAAAAhNJREFUeJztm9uWwyAIRSWr///LzpNdjo0CIhEw+7GxXjiCqAmklHIikjO5aEopJQBglV/RD602pXBtRwEA0kVtfKYDs//D6pQ8j8Zn9HCVMUo9Vr3DM10P1JjJ0jpP8y4KtwJqGuoJEU4S+ieEcgZ/FxKx/79hdA3Fjv8EpIo3EqF+ttITonqVdEKTstC6MU6DbVkN7+vVGVXwlq8HaoW+N2TqQvLA3SL0JtfuflngSsl/uDk5jKIe+M5yOZoTiZXE7OANn2MujwfDHCyH0RX2HZ6FegIATIuFMRtpTAvoWRAKlPFhFwHm18A7uKEnwkToXc25FLBHhDUboxXRrIARvEaL2jam18A7Zr0s52zSQ2dudEoZAOgLaHGwXim2rIWh3OhQhIQ8KLVLROneNNLmHxPRXQiVQAmjs2uv1uTA9rdmkxhv7Eq6zHng+9ogj+M80OMEGIXn4wSMBvpi75OZmwXv8JapXt46vAILE2UVaBJj5QRjpg+RhOphZg2MfrEsAd0Ham1uV9fBZTSuKN5J9sDZAdf3WFGMxqGMX2K/EV8BJWeMnPLU3zj9sko7rhX2q/n5wJMqIuW0ZFTmSU/cFUZ7dVO9kdq3nyyU+nLQieFwJVL7lYl5uwZqhq32A5mo4VPbhoVuEvPkl0Ta7AqjT9hwmIWu7IBnb5LA/SQPq6sFPYnhXO9TGy2ctI5K7Diy4R9RSDE21MZP9wAAAABJRU5ErkJggg==",
  area_ls_5: "iVBORw0KGgoAAAANSUhEUgAAAGgAAAAoCAYAAAASRL/NAAAABHNCSVQICAgIfAhkiAAAAc1JREFUeJztm9GSwyAIRcPO/v8vu0903FQNKoQLyZnpS5so5AoatFRKKUcDImp9bU7HnC5edp6ZtVsCER2/6q0usuog34cilDbuAmmNvKxC/Xh2bpEWLNr0xFUgKzKJ5JbiJA+xl66u7s2Q5tgHF4F2HzD/HiFSdgcLXIqbcYiIvq7PED017qs4DbKJUgMXQS//eQVSwHIufAUC5xUIHDiBIiydpWgsXiBXcRnrar2Bd/nO57XdMBMp6EJpRH3PR7cUN/PQSympUl+Lno9wc9CIpwhV4ypQq1QjgYXKKlbtF0QE7cwx6CLxIKw/Ej4LpehnEmq8FxO17RJbJFV9OIGYVaG87Z7lUiRUgZgVoUa2Iwo/sgliDhqxspDIdNYBXiBmdZKNwMinMALVoKTfOwgp0HE8RyTIYqkUIgp7VFhKN4Ii5fDMhE1xT6ErULRUEBnI96DMxU5N3E+WRt89na2/je5vcXsE9QxaiSbvCDz3P2vPVrGULyilfJ2FPo8U6SjS2ubeOXivxe75cqkPQ4F2GQlpyR3p0toX9uHWFLe6g4qIpR912y6ruLucs8air3ObIU71SNvziE7NflvtuNbiaoMQN9Jm2PlT2ciHPwbk62pH3TqQAAAAAElFTkSuQmCC",
  // 理智补充
  text_potion: "iVBORw0KGgoAAAANSUhEUgAAAE8AAAAmCAYAAACFz8YUAAAABHNCSVQICAgIfAhkiAAAAdhJREFUaIHdWtuywyAI1DP5/1/2PJmxVuIiLJruSzttFNiAXJJcSikJQM75/g4uMa1bRZXHkNXb8ucuYSNa49rvLISSxzao9za2vGtFiEUpZK0l5EopIV6XUrDn7QCTyIu2MwGrRMzWtZ6uSTgXeqFHttWu3Ymc81TX0LCNJA6VZdGJHraeB7jW0FE4ruwj4ZG8Nv5PDFUktEb6eAEKW4twJnH1U6Ofpz4iedFtlRUSiUw73BNGVIEqHSUtiSEdxkiBCuvd0hqwmhR6ORHn7pfnIcRJhER53Qg7jpYP8hDjo0LCGwx9xVJFOk+k/y1hYjUMXe8967vJm4XrrnJAwpM+sxvrReJwJKVppPvrmcRp9ep/H9lp0VddqkQPHBGgHZD3jVX1tiPhbe96YuMvrbN6XUqTkRQajlFhrE1iT9d56EVvz2ZhfULYr2JInpW4N/TCHljqMBBIs7RfwkfCsJYsVrzNY5cePaJoM7FHdouARsflkdQbiGDjLlVG3nc6QbsHtveZxxJ++g2w4OffGGDiteSdUP5Me1tmubLrea4XqKWKBpHDUy8svzEQ/WBIWrczIU3J81DOw1MiSylUX3qpUvfWjM3RPXehyoZfMWMqgV4b1eKhTcM/oTYzdTNjc5IAAAAASUVORK5CYII=",
  text_prime: "iVBORw0KGgoAAAANSUhEUgAAAE4AAAAkCAYAAAAnxQwhAAAABHNCSVQICAgIfAhkiAAAAaRJREFUaIHlWtuywyAIhEz//5fty7FjjSJEXLFnn9pJNLByTzillIiImJlq/F36Qus+b7SeGw0v6SIzh1ICcWhaXPlHSmmbhZ2Im8WllNRkRbJGNJqumgnxctXyIGb2067VxusZXNJFb9JQqOVe4Rkicd5AuTbisJYSFyGxrDossRyxQEPS6J6Tkg3UVRFAWfmrfJjXiVv2WanoSgu+SsE9lLAK66kcMqbeXJWZQwR1K2qZV8fLy7vVsq478ZCIiqxqabVGQJOBtjaiqhzxbrV2AZFwxF51dnMNZpXc5erudRwyq+6Mj487h92uLJGGKHHcLe7fZVUNtEquJiMC2V2LiyBcC63SY0fYaFpcFs5Slkj3eUyAEVNdC46YjkQjjajTq0YDYhRuhZgcegKOetsnL1VGa3JLGIE0IoOrRsiUUUgjqoh7GsSfrotEhBWhkkPE+NrDhzhJaMmiZkuNU61uajqywkI8EgDsvarW2iQgPm2IhFuMk5SwlCdW5D1OIXH4fZwE67sKTa3mAdhYqXfa5X+PnvWX8PVhYQte04dTCe3J/QaaMPo2pSG6SQAAAABJRU5ErkJggg==",
  sign_confirm: "iVBORw0KGgoAAAANSUhEUgAAAFUAAABWCAYAAAC+Ydr0AAAABHNCSVQICAgIfAhkiAAAAvJJREFUeJztnNlyhCAQRVsr///L5CFDihhAll5uA6cqL5kY7eNF0AGvEEIgIK7r6t4GrAT6sj4AojGRpe0RBKtLnRU48v+1Rd+aO5MWWtuv5r5Fk2olsYTWZUIsqWhCn0geH3tS0WWmxGPlTi1rUj0JTeE+bpakepWZwpna6aSuIDSFo57hpK4mM2U2tarj1F3oTurKCX0ymtiTVAG6pO6U0pTe29xmqbsKHaFJ6hH6Q6uHV6lH6F9afJyOSoCq1JPSPG9eilKP0Do1P6f5C5CVelLaRsnTP6k7Cw0h/P60kvN1mv8Hzqf/RyrlhfYmNuWP1B2bPkdCn97u0gc70CJ0JLHbNn/ub1DTUG4pdURozzbbSZ1JaOu2W0mdbfJsj/5WQUso0Ufq6j2/ltD4d8snVTOhkaWlWs2qvojIfj63ABYJjSyZVOt5/xALKTixTGhkqaQiCCVaSCqKUCKm5v8sSHvca30NfTLd+5cK0hKLlNDIVPOvFaSRHrSERoaT2lqQVGIRExoZSmpPQRJpQk1opDupowVxJQM5oRG1IRVHujwIJeqUOluUxlP3EprDvHt2NkYv0t8P5dAUGkLob/7aYj0JjQxdU7XEovfyJW6isYOXFsuRUKvb5aneX0qs14RGIBb8phI9JvQJyziVS6zHTikH2+DfuiDr/aecN1MwkbayO/fLGbTFIlxDn+7u2oejWBdpjdtXKCEktIToUyrUoqX5J1VyhjHX/0M6WTlf2aSii0Wh5EntITXH6zy9nJyiVIn7by9SWqj5qSYVQSxiQt+8mEz7QZPEzatUqcdwb2IRE0rU5qMpqVZi0XCz5OcpFjWhPVy9r6SXnMaDKtPt2lRUoSN0z0+NZ20lCSXOqz6Zmemch6VyfKeEymxd00ldTSxHPaxz/j1fZ2FfTOM1tdzHzb44zVNqpUIg1vujp1by+ESXUVqvr0rRPMmq41Sr9GrvV33Bb65A7gRbX3ogVlGnEnoFWwvMAXWb6mHE0MI3t7pf1G2hUnYAAAAASUVORK5CYII=",
  // 开始游戏
  auto_deploy: "iVBORw0KGgoAAAANSUhEUgAAAFwAAAAqCAYAAAA+lDyEAAAABHNCSVQICAgIfAhkiAAAAdVJREFUaIHtm9G2hCAIRXFW///L3ifvahxTUOCQtZ9dljtC1EpElElAzt/NU0oq7c/tRn3emUPSuJanRd1vztldutXYCmU8IuEacGVK2s2CeJM+3IatgWndMCfN7AJbuDVPkc5KKZbRXffZuhYip3MDQBoo7jl8xJX0XvsW0mrKi2FK8Ypuz/6RdIUj8+dZ+k4PQJxSPAe/k+jCpfDdqgMp3PFLPTVTiqZsjSjNOW8TAD8RjhjYLjI5mJeFV3V1dFpvJrdi643vS/isCC+BiAXQGe4aodfuX7hUGiJKV5b/URZCR+tmUHhKQL0tx5Vs6RJbyo41Ngf1SVM6iTyNpnBO9N09QqVHg6vtCj/CPbddNfuviTJJ1nx23SSKykH0ivYEdgCBXsTUzB5YS8cQ5kzzDmgEyCvcGTfhkdIHEughcqQ8br1xV8b5phTyWQmXazxSOPIEyVX47D6LhpwiGb2vc5sIt5BV+kspDeeS1bkG9vWsJasPZEZq+IWPNK2MJK6kCqksjYoqTIR7lYjoMhQi3Hq7tnW9KISJcCLdKI8k+Uyizk9V1l/OSqN8dGovuTdUeRgqwmeJGs0toHX4nURpAV/4cKXv8nBCpJQis/eNjNU1vfkDgXv7e+aHoWwAAAAASUVORK5CYII=",
  start_step_1: "iVBORw0KGgoAAAANSUhEUgAAAEIAAAA0CAYAAAA+L+40AAAABHNCSVQICAgIfAhkiAAAApFJREFUaIHtWtGOAyEI1Kb//8t7D7fbWAs4A+japJPcy9VFHAEBraWUozhwHPJntVZxrPR/VjY6nwcP74eSAllKoXKy5iullFocFsFYgweX/FbeyEqic9NE9AqxJo+M18YhLuMlhCIiQkIW0PjB6gbHCCaAsbI8wbHW+vrT5qDkFsAiJIEZp4MXXtexdBsSwZDATj4TrD5PVhhCgrV41sWyidSsSY0R0uIQpTJJGH1j/Ybqe8GdUN2NiwQkLvSESN+YroECzQ0yZEtyUBe2IBKReVRmw8o2I/HkwzUYErSxq4hsFz6KTb2L9DqaMcJKVqzfVxZf7QIjGzAMlnflAbOgWcUbEe0PltntSk7EQqlagzW9iKlGyGZS7Wvso/9HdJJ+3B0nUK2V3jjx+Byd3Tsfrx4cx/FPBGpKTGMlgmgMaudHdVYTqtX9xyygmWePZ0Z6qn2/2oVGRZg19sMizObFgKDsxkwvTzveW3h7nQ+kqEGR7QZS/mKV1+7Gba1yHsEePZku4FlMRn7zatUhscJ7Y3Wd61FkWJxWsb71LLVBTBDSZGXCS4i12VCKzU488/6j3Zyo+77VU6XrYmuROavDJIG9tMmyNpiIfvBopyMt/dU5x8eJVIR7jZEZWRcsGjlIDmIpPTttT2neWpNlWcPsVF0MlqNJvUmYZ1dX1SqQRVgLZy5S2EWtLNjoC56M3kRfJktYXbXSRGQouGPPM3zlN2NRdxClPgtY8TpmRi/EC9UiMstzFHe6DJVHaMkR0jDRZO0CV0I1erPg2dm7A6jr6RA1AVCm301CKYBFRF/ArHpgFgX1ztKCt3mzC0lpRLTYzewRfO0bqmz8iDjxI+LEdCJ2S5w0LLGIbyDj5xon/gAo66qPEW089wAAAABJRU5ErkJggg==",
  start_step_2: "iVBORw0KGgoAAAANSUhEUgAAAHgAAABmCAYAAAAAuFU5AAAABHNCSVQICAgIfAhkiAAAAuFJREFUeJztnEFygzAQBBH//zM5kbjKNkFIuzszmr6lfIFt9RpycNu27djEOY7Pt9haS76SfPbqCzCxyAv+Vu9/n6kgL3h1pAXfKVS9YmnBRlhwT5nKFcsK7kVVsqRgVVlPkBM8IlfxYMgJHkVNspRgNTkzkBJs3pERPLNepU0gIThCiIpkCcHmO/SCI0tTqJhecDTskqkFsw8/A1rBmXKZDxKtYHMPSsEVRbFWTCm4CkbJdIIZh1wJnWDTB5VghHoRrqEHKsEoMEmmEcw0VCQoBCPKRbymT1AIRoVBMrxghiEiAy8YHfQDCC0YfXgMQAtmAfkgwgpGHhoTkIIZ5aJeM6RgVhAlwwlGHBIzUIIV5KLdA5RgM5+lBLfWUn4bC6liGMHRQ3kVu8IPoJ3ACFYDpWIIwRXDWKXicsEZcqtkIlRcLjiaK7krPHCVCq6++RUoE4yymtUrll3RPeKUH7hKBK+4mqvuWbLgJ0WqVpwuGLneaMkV954qGOXBqpJsyZIregT0A9JLmmDX+0dmxTIFz5TLclDukCIY+cGqiqyZSBQcUZzKf7jCBTPXq7Cq6QtmlxAdQKhg5npP2A9QmGC/Ft0ncla0KzpTLvNBChGssJqziZoZZcEVRbG+Nk0XrFwv46qeKtgPVuPMniHVikaQy7aqpwlWXs3MUBWMAlPFUwT7uxcXioIR5bJUPCzY373YDAlefTUzVEyxopFBl/xY8Or1suCCJ4B8EB8Jdr35PJ05ZMGMclG/i7sF+7WIiy7BXs3XIFYMtaKZ5Z6g3cNtwV7NOPS4gCkY7eSPgLSqbwl2vf2gHFiIglGGwcad8P4V7Hq5uRTs16IxEL6LS1e0styTaslfBXs1a1BW8Ar1nlRW/FGw69XhTbAfrGKoqhjiPXgVKiTvVx9GsGK9laQWbLn5M/gV7AerPDJ/9DStYNebyyl5f/0jCst9J2smu1ezLsdx+DWpkoyKwwV7PdfyA1yKWlxX80tnAAAAAElFTkSuQmCC",
  // 游戏结算
  text_levelup: "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",
  text_reliance: "iVBORw0KGgoAAAANSUhEUgAAAJ8AAAAjCAYAAACKE9juAAAABHNCSVQICAgIfAhkiAAAAplJREFUeJztnNtyxCAIhnVn3/+V7UXHna41nDFg/O7aJjHKLyLB1tZaKwJqrdPfCx9n1r4H2j6N70p9nvQ+KZr2JPe+yU8HGhr/tkqATyPT2EIa6X2oXM9H9TirZ6knmr7M3lPjUTTvYzlmf99B8tzWmszzUVg9Sy3aWiFo7Xtm8XwUyOKjxHjjNZmWiVJ++2IpwKs4SNMG594VY0+J9a6ueUkagBqi3ntYj7UYtbZFPR9HeFczu/8c3Qt6er0oQDbQ7q45Xq8URHzW6RTPZTiqsTsWS24kLNJAU/FRtskQ0EBn8YIatOMXHeoEwgT6L9ViPXBehoiaark7+U4hivf9iM9ztmKdjWQYDZIxtBYCNpYW7VmFEK9aq/sysWJAMvLUfnfADYelR8JmS/ZYMKuQrvK0ki8Y3NSbaLfrSbbEdCl5hbeacZy+xGed4Ye4aivqEi3JeT0l1h2hpmFe2AWetNa+2t3FGLv0w5v3OFB3VFxkN5ZmxVi9240E6dvuAacb3SIn+BTcSqpWEuWDeSav08GyD55sIT6M1eXoVFZu8CKyvfiiGzfKRLgDU/E9eSCzQCl7wq63gl3VAhGtyjY6Hl7ZI/71stXZ7W4GV9CU671ClyO+B8MRlYcAj/gOZCReElqypzFf1BP1XKLvdEdWnsed2Y7yO8sY0NTzZTB2tAlyBx4bQ87xis6WeT6slB37Jr2zQCXf46kVSJjnHAtJ0olPW3K1azErBcsSekl745KdTnwzOHVz2Cet6HGsNRbLKuQVoTPcb+s4TfM8rqG1BQCc3dsd/3rCmtkyqIUy8a+O0KbyfFzjUGIZ6rN3W5Y9TyRe1YiCZfRRsRYddA9FhJkFeOcx2NELphDfyvMQklNbB17s2Mf1B3g9yXl5LzyvAAAAAElFTkSuQmCC",
  text_reward: "iVBORw0KGgoAAAANSUhEUgAAAKQAAAAZCAYAAAC/4YXqAAAABHNCSVQICAgIfAhkiAAAAtdJREFUeJzdWttyxSAIxE7+/5ftQydtakVYbpru05kjCtEVAW1E1GlA719/tdbGplfj5O/qvS/tktq9OjLmxjLmxQ2SjWg9EYsVoU87zrP/rM+MPByhkIWPILYWrTXqvUM6fxFynBgvaSo9UeVEc/qQ+aq29y344yEjoZl06ZiS5Ko8ugaS1xtlolFJcnTetfLfhNR0uF2wRi4Sq/G0NkXoIsKO5OdRmrlxnuNLx/rpuIh0nkjbfhK4RRj/f9M3cZiRUvv9qzaUD9p4lts41yk7B5kkonoSoQv1lK+a45uEt23ZntmKlU2/YsioD6ggCxqfegiF2qVpv/WPxJ3ZjMznKDvT483Uub7Sf5JMa+2HkLt3kxT3eEk+xnTesbxYxXoZGzprfSPH7L3TxX085120WXEkdsR40Rtg9vvE4xQFegpJMtOyj4Z02SRZHWVVeiXstmlHaWkFzSkkyajqkJp4xwNLvDHahuobE4AsoPHffbPxdljLT1BhfHecOcJDJqlu9wZIN0UVZZ8VLFyZln20A0XV+bJvLxC90pGSMTcr75+V7SPjWLy8Rm6G1KvD3UDJiADtbyVXdb9xjMp+RPSTZXOZtNbbRZRoLC9lEHltQsa9UkEXWKoJch561OUh5Q3p25FkNfMRzgciHKE8AghxvZ7Qekv0n65gK/HnyJbiKqL8ROCElz3eeuEJGzcbzytKoph6teghnwoqyzycDbtxgg0oKu/SJZ1wYdybRY5tkQtY7XU8iQHqITJCi/H/is00e3U0s4WzZ2uWfcLRzGG1wKdtslmSwSVU0bpmkMKdlS2XRkgCUneMfk1U8WAgMoaOttdS/J7BWrmIRriH9BiKlhyQSbeGIs/Afabb6uUjPK22VKexZwVLKQiVvXVAhPTu7qh4BjkGImPAWTZpReZzuKqnZpaLB8mjh95lawvO0UCvtrxjaYhZcRO0kpHCpoyTzGLzOIef0r2YY2sQx/4AAAAASUVORK5CYII=",
  // 活动（密林悍将）
  path_of_cacique: "iVBORw0KGgoAAAANSUhEUgAAAN0AAAAuCAYAAACswhytAAAABHNCSVQICAgIfAhkiAAAA+5JREFUeJztndtu7CAMRaGa///lnIejVJmUEGxv34AlVX1JwBhvINymllKOAuA4+snUWhHZDPNkD9UOVDrU9JF5eKDtN2ta5eGWpRaA6N4EV4qds5G2WDQk2nnc09euB89YGMm7xZs96Ibxh/wGE65DvPIYScuiTBJa9h3HoWb3aLro/KVl6r2v4Ssz0UUiuliucGwdCUIN8WUdOp5wfU1N50POZRKO4xAHScQgy9KgIPwfhZ7wWmU0Ex3Swd7Do9bztVboxzaVLGLLBMKnLfGlG16iv9uuf9K0vNCaQNBOM3JDofHdeZJKdJEryQPNSZHR/COkgUbbpmW/6axAf7sgAgK1ZDL6DCKN7MP0q/1bdAlABgJScJZIGq/zvShlSjW83MjIKrgTjl3XMnvNlt7z/ZSSb+E6E1GmxaPYIYXa40WMu5+IRm2+kQim1jqN4E6yx2zKb7prEEWrgEgBHskWJJnK5bo4jiKTw5E8Lb63npuZGcqXeiIlWi+nzVvAoQJyhsCOwJMf0/V0q3Of/tYSiIXwqI3mLI1BWtFl7OW4NvfeQ/khyiHjWej5M63ospAluKLv+u/ZNvq9y80DXYc/kR19J8JC50ZOxGElWnC99z69DLmJvrEFExOL3k5DcFGOerXehy4ZoLr0zRpIt3Ah0/VK7ywPe8lgJsHtnjceHnWiHdPnUSyXdbqZBDsTGoHufeZvFEsbUy+OI9BuUXcvSmPGvaJ3WKKb8cSwZkVnCCLk5bmoKzBmZel1OksxSKakORu8Mwj9SjZ7udRa6T2d9YWuWrQq2eLGZius7fDo2aL4ehTx7CUKD8e97W6wQmsaXZL+Rh+S6GapRIu9jJpEEh6ih1tlaHky/E1HcSz1IhiPfX8ZxIVCy7+z7EqyOBRNvg1McplpZOGthNS/HjeSWRJqnc5yc+pKvY8HGpt3qawuuFJeejoPEewerw2qLiiHX9H1v+v1P4+iQ82scTZGb+F9o9H4vYlvC+6ZVlko/vojOo0K5grvfHejh8VoJtokDhqqLV+iizgb9dTrRXI6h+z2exDFZ1I7zG54lpy/271ebqKIJQqQG55HxYD40fpdgc/sRikH4m1g1IqeaX8jF63v5uv/TVxEopP+dJH1u6vAPZO2sm8tz/GxbwOTGrhyUCDL0QsWSj6z+JbC6Tvrsv/eBsbZWykl2o/1ZUAynH/yc+tqw16d3G2IXH8RGxPS8FKrVfD4LtRCa1IJ4fvMV7BT8pX0YBZlGdrwbHnZZ6vV9BoCt9Bu1aPc2dIa/VDOIVr5yVrwiB08tZTy+zQy4CW07grsPfOE5oI9Kj9KYHuAWiPNtmmaq4WR9/4BCp2CgGszjFoAAAAASUVORK5CYII=",
  area_ri_8: "iVBORw0KGgoAAAANSUhEUgAAAF4AAAAoCAYAAAB3qU2yAAAABHNCSVQICAgIfAhkiAAAAbZJREFUaIHtWsGuxCAIlM37/1/mHTZNGiOoOFjLMqfdtFoZR1CQmJlLYgpEpD4foZRKKVDiV+ZRMugUbfQIb0Ea+2d1MDWIyDTA02G1SWoHJ/7+wSgTsGpHq/3fUo+DHz3FVVigkd6yS3q/5kEkfoasKMquYYk517MeJxBXw8zqYCJNzKgge6sB6uPf7FJ2Ax5cJfIjqR4Bt13N29ESyuyK1t5P4gV4u00X4qP6eqS7TMU/BBfiM5B+ofGQilcwczKd7S+JN2AkD7Xl5DrywbcGXNSJvO4HSnxU394jv7a7/t9qD8lOIioyp4OZVTtnV7pIPEq9EUi/0CO/9b4E1+AaiXRLYeeR7WQ00mv0UuFa21KcspO/QPr9d89e99Lfk4QjbwBofUptepUnSOlvtPM3w5oW1ibgzo/J1UQhdwaoXPw1IWYfH7nStMMG9+sdu3DiKtT2/Uu7msiq9wQRZXbSG253J1P1NrgqPsl3PrmeGNhOh7uPj6J6pB3MjCM+kupRcWtbdvIXAu2ILVoK+eIozAEKDe3wYxWS6y2DSKpHuk/XYncPbyV/dQJa7fPu5CAsE6C1+QdMzPVR7T73LwAAAABJRU5ErkJggg==",
};

module.exports = {
  sign_enter: readImageBase64(raw.sign_enter, [2560, 1440]),
  text_arouse: readImageBase64(raw.text_arouse, [2560, 1440]),
  sign_dismiss: readImageBase64(raw.sign_dismiss, [2560, 1440]),
  text_supply: readImageBase64(raw.text_supply, [2560, 1440]),
  sign_lv: readImageBase64(raw.sign_lv, [2560, 1440]),
  episode_1: readImageBase64(raw.episode_1, [2560, 1440]),
  episode_2: readImageBase64(raw.episode_2, [2560, 1440]),
  episode_3: readImageBase64(raw.episode_3, [2560, 1440]),
  episode_4: readImageBase64(raw.episode_4, [2560, 1440]),
  episode_5: readImageBase64(raw.episode_5, [2560, 1440]),
  episode_6: readImageBase64(raw.episode_6, [2560, 1440]),
  episode_7: readImageBase64(raw.episode_7, [2560, 1440]),
  tactical_drill: readImageBase64(raw.tactical_drill, [2560, 1440]),
  cargo_escort: readImageBase64(raw.cargo_escort, [2560, 1440]),
  aerial_threat: readImageBase64(raw.aerial_threat, [2560, 1440]),
  lungmen_district: readImageBase64(raw.lungmen_district, [2560, 1440]),
  sign_defeat: readImageBase64(raw.sign_defeat, [2560, 1440]),
  area_1_7: readImageBase64(raw.area_1_7, [2560, 1440]),
  "area_4_3.1": readImageBase64(raw["area_4_3.1"], [2560, 1440]), // S4-1
  area_4_4: readImageBase64(raw.area_4_4, [2560, 1440]),
  area_7_10: readImageBase64(raw.area_7_10, [2560, 1440]),
  area_7_15: readImageBase64(raw.area_7_15, [2560, 1440]),
  area_7_16: readImageBase64(raw.area_7_16, [2560, 1440]),
  area_ce_5: readImageBase64(raw.area_ce_5, [2560, 1440]),
  area_ca_5: readImageBase64(raw.area_ca_5, [2560, 1440]),
  area_ls_5: readImageBase64(raw.area_ls_5, [2560, 1440]),
  text_potion: readImageBase64(raw.text_potion, [2560, 1440]),
  text_prime: readImageBase64(raw.text_prime, [2560, 1440]),
  sign_confirm: readImageBase64(raw.sign_confirm, [2560, 1440]),
  auto_deploy: readImageBase64(raw.auto_deploy, [2560, 1440]),
  start_step_1: readImageBase64(raw.start_step_1, [2560, 1440]),
  start_step_2: readImageBase64(raw.start_step_2, [2560, 1440]),
  text_levelup: readImageBase64(raw.text_levelup, [2560, 1440]),
  text_reliance: readImageBase64(raw.text_reliance, [2560, 1440]),
  text_reward: readImageBase64(raw.text_reward, [2560, 1440]),
  path_of_cacique: readImageBase64(raw.path_of_cacique, [2560, 1440]),
  area_ri_8: readImageBase64(raw.area_ri_8, [2560, 1440]),
};
#!/bin/bash
#################################################################################################
export T=$(date +'%Y-%m-%d-%H-%M')
export _YYYYMMDD=$(date +'%Y-%m-%d')
export _HHMM=$(date +'%H%M')
export _YESTERDAY=$(date --date=yesterday +'%Y-%m-%d')
#################################################################################################
export PATH_BASE=${HOME}/power
#################################################################################################
export PATH_INPUT=${PATH_BASE}/input
export FILE_INPUT=${PATH_INPUT}/${T}.json
#################################################################################################
export FILE_OUTPUT=${PATH_BASE}/output.csv
export FILE_OUTPUT_WIND=${PATH_BASE}/wind.csv
export FILE_OUTPUT_SOLAR=${PATH_BASE}/solar.csv
export FILE_OUTPUT_FOSSIL=${PATH_BASE}/fossil.csv
#################################################################################################
export PATH_SCRIPT=${PATH_BASE}/script
export FILE_SCRIPT=${PATH_SCRIPT}/power.js
#################################################################################################
export PATH_GITHUB=${PATH_BASE}/github
export PATH_FIREBASE=${PATH_BASE}/firebase
#################################################################################################
cd ${PATH_BASE}
curl -k https://www.taipower.com.tw/d006/loadGraph/loadGraph/data/genary.json > ${FILE_INPUT}
node ${FILE_SCRIPT} ${FILE_INPUT} >> ${FILE_OUTPUT}
sort ${FILE_OUTPUT} | uniq > ${FILE_OUTPUT}.uniq
mv   ${FILE_OUTPUT}.uniq ${FILE_OUTPUT}
#################################################################################################
grep "燃氣\|燃煤\|燃油" ${FILE_OUTPUT} | awk -F, '{print $2","$3","$4}' | sort | uniq > ${FILE_OUTPUT_FOSSIL}
grep "風力"            ${FILE_OUTPUT} | awk -F, '{print $2","$3","$4}' | sort | uniq > ${FILE_OUTPUT_WIND}
grep "太陽"            ${FILE_OUTPUT} | awk -F, '{print $2","$3","$4}' | sort | uniq > ${FILE_OUTPUT_SOLAR}
#################################################################################################
mv ${FILE_OUTPUT_WIND}   ${PATH_FIREBASE}/public/
mv ${FILE_OUTPUT_SOLAR}  ${PATH_FIREBASE}/public/
sort ${FILE_OUTPUT_FOSSIL} | awk -F, '{a[$1]+=$3;b[$1]+=$2} END {for (i in a) {print i","b[i]","a[i]"%"} }' | sort > ${PATH_FIREBASE}/public/fossil.csv
rm ${FILE_OUTPUT_FOSSIL}
cp ${FILE_OUTPUT}        ${PATH_GITHUB}
#################################################################################################
cd ${PATH_FIREBASE}
firebase deploy
#################################################################################################
if [ "0005" = "${_HHMM}" ]
then
	cd ${PATH_GITHUB}
	git add * 
	git commit -m "${_YYYYMMDD}"
	git push -u https://TH385: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@github.com/TH385/TaiPower.git power

	cd ${PATH_INPUT}
	rm -fr ${_YESTERDAY}*.json
fi
#################################################################################################
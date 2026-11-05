const { execSync } = require('child_process');
module.exports = async (p) => { const DIR=__dirname; await p.screenshot({ path: DIR + '/bagchk.png', clip: { x: 470, y: 768, width: 30, height: 24 } });
 return parseFloat(execSync(`python3 -c "from PIL import Image,ImageChops,ImageStat;a=Image.open('${DIR}/bagchk.png').convert('RGB');b=Image.open('${DIR}/bagref2.png').convert('RGB');print(sum(ImageStat.Stat(ImageChops.difference(a,b)).mean))"`).toString()); };

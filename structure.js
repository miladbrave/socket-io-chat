const namespaceController = require('./controllers/nameSpaceController')
const roomController = require('./controllers/roomController')

let ns1 = new namespaceController("عمومی","/public");
let ns2 = new namespaceController("برنامه نویسی","/programming");
let ns3 = new namespaceController("گرافیک","/graphic");
let ns4 = new namespaceController("بازی سازی","/gamedsign");

ns1.addRoome(new roomController("friendes","دوستانه"))
ns1.addRoome(new roomController("coffeshop","کافی شاپ"))

ns2.addRoome(new roomController("nodejs","node.js"))
ns2.addRoome(new roomController("php","php"))
ns2.addRoome(new roomController("CSharp","C#"))
ns2.addRoome(new roomController("Python","Python"))

ns3.addRoome(new roomController("go","Go"))
ns3.addRoome(new roomController("photoshop","photoshop"))
ns3.addRoome(new roomController("illustrate","illustrate"))

ns4.addRoome(new roomController("gameplay","گیم پلی"))
ns4.addRoome(new roomController("sound","صدا گذاری"))
ns4.addRoome(new roomController("online","بازی آنلاین"))

module.exports = [ns1,ns2,ns3,ns4];
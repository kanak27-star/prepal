import FeatureCard from "./FeatureCard";

export default function Features(){

const data=[

{
icon:"💻",
title:"DSA Practice",
text:"Practice coding interviews."
},

{
icon:"🎤",
title:"AI Interview",
text:"Voice enabled interviews."
},

{
icon:"📈",
title:"Analytics",
text:"Track progress."
},

{
icon:"🤖",
title:"AI Coach",
text:"Personal suggestions."
},

{
icon:"📄",
title:"Resume Review",
text:"Improve resume."
},

{
icon:"🏆",
title:"Leaderboard",
text:"Compete globally."
}

];

return(

<section
id="features"
className="py-24 bg-slate-100"
>

<div className="max-w-7xl mx-auto">

<h1 className="text-5xl font-black text-center mb-16">

Everything You Need

</h1>

<div className="grid md:grid-cols-3 gap-8">

{
data.map((item)=>(
<FeatureCard
key={item.title}
{...item}
/>
))
}

</div>

</div>

</section>

);

}
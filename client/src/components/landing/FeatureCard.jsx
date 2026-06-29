export default function FeatureCard({
icon,
title,
text
}) {
return (

<div className="bg-white rounded-3xl p-8 shadow-xl hover:scale-105 duration-300">

<div className="text-5xl">
{icon}
</div>

<h2 className="text-2xl font-bold mt-5">

{title}

</h2>

<p className="text-slate-500 mt-3">

{text}

</p>

</div>

);
}
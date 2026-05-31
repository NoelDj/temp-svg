import { MessageCircle, Zap, Users, Puzzle, Rocket, Layers } from "lucide-react";

export default function FeaturesSection() {
    const cards = [
        {
            title: "Save Hours with AI-Powered Automation",
            description:
                "Reduce manual work with smart automation. Transform repetitive tasks into seamless workflows, freeing up time for what matters.",
            cta: "Get Started",
            icon: Zap,
            bg: "bg-orange-50",
            border: "border-orange-100",
            img: "plan-list-svgrepo-com.svg"
        },
        {
            title: "Work Seamlessly with Your Team",
            description:
                "Collaborate in real-time with built-in tools for messaging, feedback, and shared project tracking.",
            cta: "Try it Now",
            icon: Users,
            bg: "bg-blue-50",
            border: "border-blue-100",
            img: "wallet-svgrepo-com.svg"
        },
        {
            title: "Connect with Your Favorite Tools",
            description:
                "Integrate Slack, Notion, Zapier, and more to build a powerful workflow ecosystem that fits your stack.",
            cta: "Explore Integrations",
            icon: Puzzle,
            bg: "bg-purple-50",
            border: "border-purple-100",
            img: "desk-lamp-svgrepo-com.svg"
        },
        {
            title: "Scale Without Limits",
            description:
                "Build systems that grow with your team and handle increasing complexity effortlessly.",
            cta: "Scale Now",
            icon: Rocket,
            bg: "bg-orange-50",
            border: "border-orange-100",
            img: "brush-svgrepo-com.svg"
        },
        {
            title: "Organize Everything in One Place",
            description:
                "Keep your work structured with unified views across projects, tasks, and teams.",
            cta: "Organize",
            icon: Layers,
            bg: "bg-blue-50",
            border: "border-blue-100",
            img: "camera-svgrepo-com.svg"
        },
        {
            title: "Always Stay Connected",
            description:
                "Stay in sync with real-time updates and notifications across your workspace.",
            cta: "Stay Connected",
            icon: MessageCircle,
            bg: "bg-purple-50",
            border: "border-purple-100",
            img: "bedside-table-svgrepo-com.svg"
        }
    ]

    return (
        <section className="">

            <div className={`w-full p-6 rounded-2xl border bg-slate-100 border-slate-200 flex flex-col justify-between`}>
                <div className="my-10 m-4 flex">
                    <h3 className="text-7xl font-semibold mb-3 text-gray-900">
                        Easy to solution, loaded with powerful feature.
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        We love connecting face-to-face with our customers and other.
                    </p>
                </div>

                <div className="flex flex-wrap gap-6">
                    {cards.map((card, idx) => (
                        <div
                            key={idx}
                            className={`h-[400px] overflow-hidden relative w-full md:w-[calc(33%-12px)] p-6 rounded-2xl border bg-white border-slate-200 flex flex-col justify-between`}
                        >
                            <div>
                                <img src={card.img} className="w-1/2" alt="" />

                                
                            </div>

                            <div className="text-sm font-medium text-gray-900 self-start">
                                
                                <h3 className="text-lg font-semibold mb-1 text-gray-900 mt-5">
                                    {card.title}
                                </h3>

                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {card.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
        </section>
    )
}

function Badge({ Icon }) {
    return (       
        <div className="size-12 rounded-full bg-slate-100 flex items-center justify-center">
            <Icon
                className="text-black-500 size-6"
                strokeWidth={2}
            />
        </div>
    )
}
function PricingSection() {
    return (
        <section className="py-20">
            <div className="mx-auto w-full max-w-[1200px]">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">Simple and Transparent Pricing</h2>
                    <p className="text-lg text-gray-700">Choose the plan that fits your needs. No hidden fees, cancel anytime.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 align-items-stretch">
                    <div className="border rounded-xl p-6 flex flex-col">
                        <h3 className="text-2xl font-semibold mb-4">Free Plan</h3>
                        <p className="text-gray-700 mb-6">Perfect for individuals and small projects. Get access to basic features and start editing your SVGs today.</p>
                        <ul className="mb-6 flex-1">
                            <li className="flex items-center gap-2 mb-2">
                                <span className="w-4 h-4 bg-green-500 rounded-full flex-shrink-0"></span>
                                Access to basic features
                            </li>
                            <li className="flex items-center gap-2 mb-2">
                                <span className="w-4 h-4 bg-green-500 rounded-full flex-shrink-0"></span>
                                Limited to 5 projects
                            </li>
                            <li className="flex items-center gap-2 mb-2">
                                <span className="w-4 h-4 bg-green-500 rounded-full flex-shrink-0"></span>
                                Community support
                            </li>
                        </ul>
                        <button className="mt-auto bg-gray-800 text-white py-2 rounded-full hover:bg-gray-900 transition">Get Started</button>
                    </div>
                    <div className="border rounded-xl p-6 flex flex-col">
                        <h3 className="text-2xl font-semibold mb-4">Pro Plan</h3>
                        <p className="text-gray-700 mb-6">Ideal for professionals and teams. Unlock advanced features, priority support, and more projects to manage your work efficiently.</p>
                        <ul className="mb-6 flex-1">
                            <li className="flex items-center gap-2 mb-2">
                                <span className="w-4 h-4 bg-green-500 rounded-full flex-shrink-0"></span>
                                Access to all features including advanced tools
                            </li>
                            <li className="flex items-center gap-2 mb-2">
                                <span className="w-4 h-4 bg-green-500 rounded-full flex-shrink-0"></span>
                                Unlimited projects
                            </li>
                            <li className="flex items-center gap-2 mb-2">
                                <span className="w-4 h-4 bg-green-500 rounded-full flex-shrink-0"></span>
                                Priority email support
                            </li>
                        </ul>
                        <button className="mt-auto bg-primary text-white py-2 rounded-full hover:bg-primary-600 transition">Upgrade to Pro</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PricingSection
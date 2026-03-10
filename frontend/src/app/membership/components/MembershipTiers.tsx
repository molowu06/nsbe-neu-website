// components/MembershipTiers.tsx

import { FaCheckCircle } from "react-icons/fa";
import { tiers } from "@/data/TierData";

export default function MembershipTiers() {
    return (
    <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-2">
            Membership Tiers
        </h2>
        <p className="text-center text-gray-500 mb-12">
            Progress through our tier system as you engage with BESS
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier) => (
            <div
                key={tier.name}
                className={`${tier.colors.bg} ${tier.colors.border} border-2 rounded-2xl p-6 flex flex-col`}
            >
              {/* tier name + description */}
                <h3
                className={`text-xl font-bold text-center ${tier.colors.text}`}
                >
                {tier.name}
                </h3>
                <p
                className={`text-center text-sm mt-1 ${tier.colors.text} opacity-80`}
                >
                {tier.description}
                </p>

              {/* level + subtitle */}
                <p
                className={`${tier.levelSize} font-bold text-center mt-4 ${tier.colors.text}`}
                >
                {tier.level}
                </p>
                <p
                className={`text-center text-sm ${tier.colors.text} opacity-70`}
                >
                {tier.subtitle}
                </p>

              {/* Benefits */}
                <ul className="mt-6 space-y-3 flex-grow">
                {tier.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2">
                    <FaCheckCircle
                        className={`${tier.colors.check} mt-0.5 flex-shrink-0`}
                    />
                    <span className={`text-sm ${tier.colors.text}`}>
                        {benefit}
                    </span>
                    </li>
                ))}
                </ul>

            </div>
            ))}
        </div>
        </div>
    </section>
    );
}

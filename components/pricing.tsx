import { Check, Sparkles, Crown, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function Pricing() {
  const plans = [
    {
      name: "Early Bird",
      price: "$19",
      period: "/month",
      description: "Special launch pricing for early adopters",
      icon: Sparkles,
      features: [
        "10 AI-generated posts per month",
        "Basic scheduling",
        "Performance analytics",
        "LinkedIn integration",
        "Email support",
        "Beta access features",
      ],
      buttonText: "Join Beta",
      buttonVariant: "outline" as const,
      popular: false,
    },
    {
      name: "Professional",
      price: "$49",
      period: "/month",
      description: "Perfect for professionals and small businesses",
      icon: Crown,
      features: [
        "50 AI-generated posts per month",
        "Advanced scheduling & optimization",
        "Detailed analytics & insights",
        "Content calendar",
        "Priority support",
        "Custom brand voice",
        "Early access to new features",
      ],
      buttonText: "Join Beta",
      buttonVariant: "default" as const,
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For teams and large organizations",
      icon: Rocket,
      features: [
        "Unlimited AI-generated posts",
        "Team collaboration tools",
        "Advanced analytics dashboard",
        "Custom integrations",
        "Dedicated account manager",
        "White-label options",
        "API access",
        "Custom training",
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const,
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Early Access{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Special Pricing
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join our beta program with exclusive early access pricing. Limited time offer for the first 100 users.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                plan.popular ? "ring-2 ring-blue-500 scale-105" : ""
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-blue-700">
                  Most Popular
                </Badge>
              )}

              <CardHeader className="text-center pb-8">
                <div
                  className={`w-12 h-12 mx-auto mb-4 rounded-lg flex items-center justify-center ${
                    plan.popular ? "bg-blue-100" : "bg-gray-100"
                  }`}
                >
                  <plan.icon className={`h-6 w-6 ${plan.popular ? "text-blue-600" : "text-gray-600"}`} />
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-500">{plan.period}</span>
                </div>
                <CardDescription className="text-gray-600 mt-2">{plan.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.buttonVariant === "default"
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                      : ""
                  }`}
                  variant={plan.buttonVariant}
                  size="lg"
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">All plans include:</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <span>✓ 14-day free trial</span>
            <span>✓ No setup fees</span>
            <span>✓ Cancel anytime</span>
            <span>✓ 24/7 support</span>
          </div>
        </div>
      </div>
    </section>
  )
}

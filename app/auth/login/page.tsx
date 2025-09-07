"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [step, setStep] = useState<"login" | "phone" | "otp">("login")
  const router = useRouter()
  const supabase = createClient()

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      router.push("/")
    }
    setLoading(false)
  }

  const handleEmailOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const { error } = await supabase.auth.signInWithOtp({
      email: email,
    })

    if (error) {
      setError(error.message)
    } else {
      setMessage("OTP sent to your email")
      setStep("otp")
    }
    setLoading(false)
  }

  const handleOtpVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const { error } = await supabase.auth.verifyOtp({
      email: email,
      token: otp,
      type: "email"
    })

    if (error) {
      setError(error.message)
    } else {
      router.push("/")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">
            {step === "login" ? "Sign In" : step === "phone" ? "Phone Login" : "Verify OTP"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {message && (
            <Alert>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          {step === "login" && (
            <>
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
              
              <div className="text-center">
                <Button
                  variant="outline"
                  onClick={() => setStep("phone")}
                  className="w-full"
                >
                  Login with Email OTP
                </Button>
              </div>
            </>
          )}

          {step === "phone" && (
            <form onSubmit={handleEmailOtp} className="space-y-4">
              <div>
                <Label htmlFor="emailOtp">Email Address</Label>
                <Input
                  id="emailOtp"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Sending OTP..." : "Send Email OTP"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep("login")}
                className="w-full"
              >
                Back to Password Login
              </Button>
            </form>
          )}

          {step === "otp" && (
            <form onSubmit={handleOtpVerify} className="space-y-4">
              <div>
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="123456"
                  maxLength={6}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleEmailOtp({ preventDefault: () => {} } as React.FormEvent)}
                className="w-full"
              >
                Resend Email OTP
              </Button>
            </form>
          )}

          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link href="/auth/register" className="text-emerald-600 hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
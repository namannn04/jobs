"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../lib/auth-context"
import { db } from "../../lib/firebase"
import { doc, getDoc, setDoc } from "firebase/firestore"
import {
  AlertCircle,
  Edit2,
  Save,
  X,
  User,
  Mail,
  Phone,
  Globe,
  RefreshCw,
  LogIn,
} from "lucide-react"

interface UserProfile {
  name: string
  email: string
  mobile: string
  country: string
}

const Profile: React.FC = () => {
  const { currentUser, loading } = useAuth()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [retryCount, setRetryCount] = useState(0)
  const [isRetrying, setIsRetrying] = useState(false)
  const [isOffline, setIsOffline] = useState(false)

  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    mobile: "",
    country: "",
  })

  const [editedProfile, setEditedProfile] = useState<UserProfile>({
    name: "",
    email: "",
    mobile: "",
    country: "",
  })

  // Check online status
  useEffect(() => {
    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    setIsOffline(!navigator.onLine)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const fetchUserProfile = async () => {
    if (!currentUser?.uid) {
      return
    }

    try {
      setIsLoading(true)
      setError("")

      if (!navigator.onLine) {
        setIsOffline(true)
        setError("You are currently offline. Some features may be limited.")

        setProfile({
          name: "",
          email: currentUser.email || "",
          mobile: "",
          country: "",
        })

        setEditedProfile({
          name: "",
          email: currentUser.email || "",
          mobile: "",
          country: "",
        })

        setIsLoading(false)
        return
      }

      // Timeout for slow connections
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(
          () =>
            reject(
              new Error(
                "Connection timeout - check your internet connection"
              )
            ),
          10000
        )
      })

      const userDocRef = doc(db, "users", currentUser.uid)

      // Race between Firestore and timeout
      const userDoc = (await Promise.race([
        getDoc(userDocRef),
        timeoutPromise,
      ])) as any

      if (userDoc.exists()) {
        const userData = userDoc.data() || {}

        // Ensure all fields are strings (fallback to "")
        setProfile({
          name: userData.name ?? "",
          email: currentUser.email || "",
          mobile: userData.mobile ?? "",
          country: userData.country ?? "",
        })
        setEditedProfile({
          name: userData.name ?? "",
          email: currentUser.email || "",
          mobile: userData.mobile ?? "",
          country: userData.country ?? "",
        })
      } else {
        // Document doesn't exist, create default
        const newProfile = {
          name: "",
          mobile: "",
          country: "",
          email: currentUser.email || "",
        }
        setProfile(newProfile)
        setEditedProfile(newProfile)

        // Create document in Firestore
        if (navigator.onLine) {
          try {
            await setDoc(userDocRef, {
              name: "",
              mobile: "",
              country: "",
            })
          } catch (err) {
            console.warn("Could not initialize user profile document:", err)
          }
        }
      }

      setRetryCount(0)
      setIsOffline(false)
    } catch (err: any) {
      console.error("Error fetching profile:", err)

      if (
        !navigator.onLine ||
        (err.message && err.message.includes("offline"))
      ) {
        setIsOffline(true)
        setError(
          "You are currently offline. Some profile data may not be available."
        )
      } else if (err.message && err.message.includes("timeout")) {
        setError("Connection is very slow or unstable. Try again later.")
      } else if (err.code === "permission-denied") {
        setError("You don't have permission to access this profile.")
      } else if (err.code === "unavailable") {
        setError(
          "Firebase service is currently unavailable. Please try again later."
        )
      } else {
        setError("Could not load profile data. Please try again later.")
        console.error("Detailed error:", err)
      }

      setProfile({
        name: "",
        email: currentUser.email || "",
        mobile: "",
        country: "",
      })

      setEditedProfile({
        name: "",
        email: currentUser.email || "",
        mobile: "",
        country: "",
      })

      if (!isRetrying) {
        setRetryCount((prev) => prev + 1)
      }
    } finally {
      setIsLoading(false)
      setIsRetrying(false)
    }
  }

  useEffect(() => {
    if (loading) return

    if (!currentUser) {
      return
    }

    fetchUserProfile()
    // eslint-disable-next-line
  }, [currentUser, loading])

  const handleRetry = () => {
    setIsRetrying(true)
    fetchUserProfile()
  }

  const handleEditToggle = () => {
    setIsEditing(!isEditing)
    setEditedProfile(profile)
    setError("")
    setSuccess("")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditedProfile((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsLoading(true)

    if (!navigator.onLine) {
      setError("You are offline. Changes can't be saved right now.")
      setIsLoading(false)
      return
    }

    try {
      if (!currentUser?.uid) {
        throw new Error("User not authenticated")
      }

      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(
          () =>
            reject(
              new Error(
                "Connection timeout - check your internet connection"
              )
            ),
          10000
        )
      })

      const userDocRef = doc(db, "users", currentUser.uid)

      await Promise.race([
        setDoc(
          userDocRef,
          {
            name: editedProfile.name,
            mobile: editedProfile.mobile,
            country: editedProfile.country,
          },
          { merge: true }
        ),
        timeoutPromise,
      ])

      setProfile({
        ...editedProfile,
        email: currentUser.email || "",
      })

      setSuccess("Profile updated successfully")
      setIsEditing(false)
    } catch (err: any) {
      console.error("Error updating profile:", err)

      if (
        !navigator.onLine ||
        (err.message && err.message.includes("offline"))
      ) {
        setError("You are currently offline. Changes couldn't be saved.")
      } else if (err.message && err.message.includes("timeout")) {
        setError("Connection is very slow or unstable. Try again later.")
      } else if (err.code === "permission-denied") {
        setError("You don't have permission to update this profile.")
      } else if (err.code === "unavailable") {
        setError(
          "Firebase service is currently unavailable. Please try again later."
        )
      } else {
        setError("Failed to update profile. Please try again later.")
        console.error("Detailed error:", err)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignIn = () => {
    navigate("/signin")
  }

  // Show authentication dialog for non-authenticated users
  if (!loading && !currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-white to-blue-50">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl border border-blue-900/10 overflow-hidden p-8 text-center">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-blue-900/60" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-blue-900">
              Authentication Required
            </h2>
            <p className="text-gray-600 mb-8">
              Please sign in to view and manage your profile.
            </p>
            <button
              onClick={handleSignIn}
              className="w-full py-3.5 px-6 bg-blue-900 text-white rounded-md font-medium shadow-md hover:bg-blue-800 hover:translate-y-[-2px] hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-white to-blue-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-white to-blue-50">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-2xl border border-blue-900/10 overflow-hidden transition-all duration-300 hover:translate-y-[-5px] hover:shadow-[0_25px_50px_-12px_rgba(30,58,138,0.25)]">
          <div className="relative">
            <div className="h-40 bg-gradient-to-r from-blue-900 to-blue-700" />

            <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-16">
              <div className="w-32 h-32 rounded-full bg-white p-2 shadow-lg">
                <div className="w-full h-full rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="w-16 h-16 text-blue-900/60" />
                </div>
              </div>
            </div>

            <div className="absolute top-4 right-4">
              <button
                onClick={handleEditToggle}
                className={`p-2 rounded-full bg-white/90 transition-all ${
                  isEditing ? "text-red-500" : "text-blue-900"
                }`}
              >
                {isEditing ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Edit2 className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div className="px-8 pt-20 pb-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-blue-900 break-words">
                {profile.name || "Your Profile"}
              </h1>
              <p className="text-gray-600 mt-1 break-words">{profile.email}</p>
              {isOffline && (
                <div className="mt-2 bg-yellow-100 text-yellow-700 py-1 px-3 rounded-full text-xs inline-flex items-center">
                  <span className="mr-1">•</span> Offline Mode
                </div>
              )}
            </div>

            {error && (
              <div className="flex items-start gap-3 p-4 mb-6 rounded-md bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p>{error}</p>
                  {isOffline && (
                    <button
                      onClick={handleRetry}
                      className="mt-2 flex items-center gap-1 text-blue-900 hover:text-blue-700"
                      disabled={isRetrying}
                    >
                      <RefreshCw
                        className={`w-3 h-3 ${
                          isRetrying ? "animate-spin" : ""
                        }`}
                      />
                      <span>
                        {isRetrying ? "Retrying..." : "Retry connection"}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {success && (
              <div className="flex items-start gap-3 p-4 mb-6 rounded-md bg-green-500/10 border border-green-500/20 text-green-500 text-sm">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p>{success}</p>
              </div>
            )}

            {isLoading && !isEditing ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div>
              </div>
            ) : isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {["name", "mobile", "country"].map((field) => (
                  <div key={field} className="space-y-2">
                    <label
                      htmlFor={field}
                      className="block text-sm font-medium text-blue-900 capitalize"
                    >
                      {field}
                    </label>
                    <input
                      id={field}
                      name={field}
                      type="text"
                      placeholder={`Enter your ${field}`}
                      value={(editedProfile as any)[field]}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-md border border-blue-900/20 focus:outline-none focus:border-blue-900 focus:ring-3 focus:ring-blue-900/10 transition-all"
                    />
                  </div>
                ))}

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-blue-900"
                  >
                    Email (Cannot be changed)
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={editedProfile.email}
                    disabled
                    className="w-full px-4 py-3 rounded-md border border-blue-900/20 bg-gray-50 cursor-not-allowed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading || isOffline}
                  className="w-full py-3.5 px-6 bg-blue-900 text-white rounded-md font-medium shadow-md hover:bg-blue-800 hover:translate-y-[-2px] hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="space-y-6">
                {[
                  {
                    label: "Full Name",
                    value: profile.name,
                    icon: <User className="w-5 h-5 text-blue-900" />,
                  },
                  {
                    label: "Email Address",
                    value: profile.email,
                    icon: <Mail className="w-5 h-5 text-blue-900" />,
                  },
                  {
                    label: "Mobile Number",
                    value: profile.mobile,
                    icon: <Phone className="w-5 h-5 text-blue-900" />,
                  },
                  {
                    label: "Country",
                    value: profile.country,
                    icon: <Globe className="w-5 h-5 text-blue-900" />,
                  },
                ].map(({ label, value, icon }) => (
                  <div
                    key={label}
                    className="bg-blue-50 rounded-xl p-5 transform transition-all duration-300 hover:scale-105 hover:shadow-md"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-blue-900/10 rounded-full">
                        {icon}
                      </div>
                      <h3 className="text-sm font-medium text-blue-900/70">
                        {label}
                      </h3>
                    </div>
                    <p className="text-lg font-semibold text-blue-900 pl-10 break-words overflow-hidden">
                      {value || "N/A"}
                    </p>
                  </div>
                ))}

                <button
                  onClick={handleEditToggle}
                  disabled={isOffline}
                  className="w-full py-3.5 px-6 bg-blue-900 text-white rounded-md font-medium shadow-md hover:bg-blue-800 hover:translate-y-[-2px] hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile

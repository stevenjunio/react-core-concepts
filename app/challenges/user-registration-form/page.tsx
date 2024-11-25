"use client";
import { useState, FormEvent, ChangeEvent } from "react";

interface ValidationErrors {
  email: string;
  password: string;
}

interface TestCase {
  input: {
    email: string;
    password: string;
  };
  expectedResult: boolean;
  description: string;
}

const TEST_CASES: TestCase[] = [
  {
    input: { email: "test@example.com", password: "Password123!" },
    expectedResult: true,
    description: "Valid email and password",
  },
  {
    input: { email: "invalid-email", password: "Password123!" },
    expectedResult: false,
    description: "Invalid email format",
  },
  {
    input: { email: "test@example.com", password: "short" },
    expectedResult: false,
    description: "Password too short",
  },
  {
    input: { email: "test@example.com", password: "nouppercasepassword1!" },
    expectedResult: false,
    description: "Password missing uppercase",
  },
];

function validateForm(email: string, password: string): boolean {
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return false;
  }

  // Password validation
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};:'",.<>/?]/.test(password);
  const isLongEnough = password.length >= 8;

  return hasUpperCase && hasNumber && hasSpecial && isLongEnough;
}

function RegistrationForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<ValidationErrors>({
    email: "",
    password: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateAndUpdateErrors = (
    email: string,
    password: string
  ): ValidationErrors => {
    const newErrors = {
      email: "",
      password: "",
    };

    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else {
      if (password.length < 8) {
        newErrors.password += "Password must be at least 8 characters. ";
      }
      if (!/[A-Z]/.test(password)) {
        newErrors.password += "Missing uppercase letter. ";
      }
      if (!/[0-9]/.test(password)) {
        newErrors.password += "Missing number. ";
      }
      if (!/[!@#$%^&*()_+\-=\[\]{};:'",.<>/?]/.test(password)) {
        newErrors.password += "Missing special character.";
      }
    }

    setErrors(newErrors);
    return newErrors;
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    validateAndUpdateErrors(newEmail, password);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validateAndUpdateErrors(email, newPassword);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateAndUpdateErrors(email, password);

    if (!validationErrors.email && !validationErrors.password) {
      setIsSubmitted(true);
      console.log("Form submitted successfully", { email, password });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Register
        </button>
      </form>

      {isSubmitted && (
        <div className="mt-4 p-2 bg-green-100 text-green-700 rounded">
          Registration successful!
        </div>
      )}
    </div>
  );
}

function runTests() {
  let passedTests = 0;
  const results: {
    testNumber: number;
    description: string;
    passed: boolean;
  }[] = [];

  TEST_CASES.forEach((testCase, index) => {
    const { email, password } = testCase.input;
    const isValid = validateForm(email, password);

    const passed = isValid === testCase.expectedResult;
    results.push({
      testNumber: index + 1,
      description: testCase.description,
      passed,
    });

    if (passed) passedTests++;
  });

  console.log("Test Results:", results);
  console.log(`Passed ${passedTests} out of ${TEST_CASES.length} tests`);
  return passedTests === TEST_CASES.length;
}

// Run tests
runTests();

export default RegistrationForm;

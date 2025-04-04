import {motion} from 'framer-motion';
import LoginButton from './components/LoginButton';
import Image from '@/components/image';
import coin from '@/assets/icons/coin.svg';
const AuthPage = () => {
  return (
    <main className='flex flex-col min-h-screen items-center justify-between'>
    <section className='flex relative flex-col min-h-screen items-center justify-center w-full max-w-[768px]'>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-4/5 py-18 space-y-8 p-8 relative rounded-xl flex flex-col justify-center items-center shadow-lg 
               bg-gradient-to-br "
      >
        <motion.div
          className="absolute inset-0 rounded-xl border-2 border-transparent"
          animate={{
            boxShadow: [
              "0 0 10px rgba(139, 92, 246, 0.5)",
              "0 0 20px rgba(99, 102, 241, 0.8)",
              "0 0 10px rgba(139, 92, 246, 0.5)"
            ]
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut"
          }}
        />
        <Image
          src={coin}
          width={70}
          height={70}
          className=" z-40"
          alt='coin'
          />
        <motion.div className="text-center relative z-10">
          <h2 className="mt-2 text-3xl font-extrabold text-white">
            Sign in to{" "}
            <motion.span
              className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 
               bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              AI Agent
            </motion.span>
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            Connect with your X account to continue
          </p>
        </motion.div>
        <div className="space-y-2">
          <div className="flex flex-col items-center">
          <LoginButton/>

            <div className="my-4 text-center">
              <p className="text-sm text-gray-400">
                By signing in, you agree to our{" "}
                <a
                  href="/terms"
                  className="font-medium text-blue-400 hover:text-blue-300"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="/privacy"
                  className="font-medium text-blue-400 hover:text-blue-300"
                >
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  </main>
  )
};

export default AuthPage;

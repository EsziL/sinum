// SPECIAL THANKS TO CHATGPT FOR THIS ONE I DO NOT KNOW KOTLIN

package com.eszil.sinum

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Callback
import java.io.BufferedReader
import java.io.InputStreamReader
import java.io.File

class ProotModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "ProotModule"
    }

    @ReactMethod
    fun runProotCommand(command: String, successCallback: Callback, errorCallback: Callback) {
        try {
            val binaryName = "proot/arm64-v8a/proot"
            val assetManager = reactApplicationContext.assets
            val binaryDescriptor = assetManager.openFd(binaryName).fileDescriptor
            
            val process = ProcessBuilder(binaryDescriptor.toString(), command).start()
            val reader = BufferedReader(InputStreamReader(process.inputStream))
            val output = StringBuilder()
            var line: String?

            while (reader.readLine().also { line = it } != null) {
                output.append(line).append("\n")
            }

            process.waitFor()

            successCallback.invoke(output.toString())

        } catch (e: Exception) {
            errorCallback.invoke(e.message)
        }
    }
}
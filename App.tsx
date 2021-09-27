import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons'

type RowInputProps = {
	onchangeText: React.ComponentProps<typeof TextInput>["onChangeText"]
	isChecked: Boolean
	handleCheck: React.ComponentProps<typeof TouchableOpacity>["onPress"]
}

type ActionButton = "tambah" | "kurang" | "kali" | "bagi"

const RowInput = (props: RowInputProps): React.ReactElement => {
	const { isChecked, onchangeText, handleCheck } = props
	return (
		<View style={{ flexDirection: "row", marginBottom: 10 }}>
			<TextInput placeholder="" style={{ width: "85%", borderWidth: 2, height: 30, paddingLeft: 10 }} keyboardType="number-pad" onChangeText={onchangeText} />
			<TouchableOpacity style={{ width: "15%", justifyContent: 'center', alignItems: 'center' }} onPress={handleCheck}>
				<Feather name={isChecked ? "check-square" : "square"} color={"black"} size={24} />
			</TouchableOpacity>
		</View>
	)
}

export default function App() {
	const [hasil, setHasil] = useState(0)

	const initTial = [
		{ value: "", checkded: false },
		{ value: "", checkded: false },
		{ value: "", checkded: false },
	]
	const [checkInput, setCheckInput] = useState(initTial)

	const handleAction = (action: ActionButton) => {
		let hasil = 0
		let countCheck = 0
		let first = true
		checkInput.map((data) => {
			if (data.checkded && data.value.length > 0) {
				countCheck += 1
				if (first) {
					hasil = parseFloat(data.value)
					first = false
					return false
				}
				if (action === "tambah") {
					hasil += parseFloat(data.value)
				} else if (action === "kurang") {
					hasil -= parseFloat(data.value)
				} else if (action === "kali") {
					hasil *= parseFloat(data.value)
				} else if (action === "bagi") {
					hasil /= parseFloat(data.value)
				}
			}
		})
		if (countCheck > 1) {
			setHasil(hasil)
		} else if (countCheck > 0) {
			Alert.alert("Oops !!!", "yang dichecklist cuman 1 doang nih")
		} else {
			Alert.alert("Oops !!!", "Belum ada yang di checklist kaka")
		}
	}

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<View style={{ marginBottom: 20 }}>
				<RowInput
					onchangeText={(value) => {
						let tempInput = [...checkInput]
						tempInput[0].value = value
						setCheckInput(tempInput)
					}}
					isChecked={checkInput[0].checkded}
					handleCheck={() => {
						let tempInput = [...checkInput]
						tempInput[0].checkded = !checkInput[0].checkded
						setCheckInput(tempInput)
					}}
				/>
				<RowInput onchangeText={(value) => {
					let tempInput = [...checkInput]
					tempInput[1].value = value
					setCheckInput(tempInput)
				}}
					isChecked={checkInput[1].checkded}
					handleCheck={() => {
						let tempInput = [...checkInput]
						tempInput[1].checkded = !checkInput[1].checkded
						setCheckInput(tempInput)
					}} />
				<RowInput onchangeText={(value) => {
					let tempInput = [...checkInput]
					tempInput[2].value = value
					setCheckInput(tempInput)
				}}
					isChecked={checkInput[2].checkded}
					handleCheck={() => {
						let tempInput = [...checkInput]
						tempInput[2].checkded = !checkInput[2].checkded
						setCheckInput(tempInput)
					}} />
			</View>
			<View style={{ flexDirection: "row" }}>
				<View style={{ width: "55%", flexDirection: "row", justifyContent: "space-between", }}>
					<TouchableOpacity style={{ width: 40, height: 40, borderWidth: 2, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }} onPress={() => handleAction("tambah")}
					>
						<Feather name={"plus"} />
					</TouchableOpacity>
					<TouchableOpacity style={{ width: 40, height: 40, borderWidth: 2, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }} onPress={() => handleAction("kurang")} >
						<Feather name={"minus"} />
					</TouchableOpacity>
					<TouchableOpacity style={{ width: 40, height: 40, borderWidth: 2, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }} onPress={() => handleAction("kali")} >
						<Text>X</Text>
					</TouchableOpacity>
					<TouchableOpacity style={{ width: 40, height: 40, borderWidth: 2, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }} onPress={() => handleAction("bagi")}>
						<Text>/</Text>
					</TouchableOpacity>
				</View>
				<View style={{ width: '45%' }} />
			</View>
			<View style={{ flexDirection: "row", marginBottom: 20, marginTop: 20 }}>
				<View style={{ width: "85%", flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 2 }} />
				<View style={{ width: '15%' }} />
			</View>
			<View style={{ flexDirection: "row", marginBottom: 10 }}>
				<View style={{ width: "85%", flexDirection: "row", justifyContent: "space-between", }}>
					<View style={{ width: "30%" }}>
						<Text style={{ fontWeight: "500", fontSize: 24 }}>Hasil :</Text>
					</View>
					<View style={{ width: "70%", alignItems: "flex-end" }}>
						<Text style={{ fontWeight: "500", fontSize: 24 }}>{hasil}</Text>
					</View>
				</View>
				<View style={{ width: '15%' }} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		paddingLeft: 10
	},
});

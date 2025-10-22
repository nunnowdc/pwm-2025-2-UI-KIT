import { Switch, View } from "react-native";
import { Button, Text } from "@rneui/themed";

export function CardTask({ task, onDelete, onCheck }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>    
      <Text style={{ flex: 1, fontSize: 18 }}>{task.description}</Text>

      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={"#f5dd4b"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => onCheck(task)}
        value={task.done}
      />

      <Button 
        title="X" 
        onPress={() => onDelete(task.objectId)} 
        buttonStyle={{ backgroundColor: 'red', width: 40, height: 40, marginLeft: 10 }}
        containerStyle={{ borderRadius: 5, overflow: 'hidden' }}
      />
    </View>
  );
}

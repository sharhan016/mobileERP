import React from "react";
import { 
    View
} from "react-native";

const Spacer = (props) => (
    <View style={{paddingVertical: props.space, paddingHorizontal: props.hspace}}>
    </View>
    )
export default Spacer;

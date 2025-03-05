import { IsEthereumAddress, IsNotEmpty, IsString } from 'class-validator'

export class AddressParamDto {
	@IsNotEmpty()
	@IsString()
	@IsEthereumAddress()
	address: string
}

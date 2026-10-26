<?php

namespace Database\Seeders;

use App\Models\Destination;
use App\Models\Package;
use App\Models\TravelOffer;
use Illuminate\Database\Seeder;

class TravelDemoSeeder extends Seeder
{
    public function run(): void
    {
        $destinations = [
            ['name'=>'Bali','country'=>'Indonesia','img'=>'https://picsum.photos/seed/bali-travel/540/400','price_from'=>34999,'note'=>'5N / 6D','tag'=>'↓ 18% this week','is_trending'=>true],
            ['name'=>'Kyoto','country'=>'Japan','img'=>'https://picsum.photos/seed/kyoto-travel/540/400','price_from'=>58499,'note'=>'6N / 7D','tag'=>'Trending','is_trending'=>true],
            ['name'=>'Santorini','country'=>'Greece','img'=>'https://picsum.photos/seed/santorini-travel/540/400','price_from'=>72250,'note'=>'5N / 6D','tag'=>'New route','is_trending'=>true],
            ['name'=>'Leh-Ladakh','country'=>'India','img'=>'https://picsum.photos/seed/ladakh-travel/540/400','price_from'=>21999,'note'=>'4N / 5D','tag'=>'Best seller','is_trending'=>true],
            ['name'=>'Cape Town','country'=>'South Africa','img'=>'https://picsum.photos/seed/capetown-travel/540/400','price_from'=>64750,'note'=>'7N / 8D','tag'=>'↓ 12% this week','is_trending'=>true],
            ['name'=>'Reykjavik','country'=>'Iceland','img'=>'https://picsum.photos/seed/reykjavik-travel/540/400','price_from'=>89300,'note'=>'6N / 7D','tag'=>'Northern lights','is_trending'=>true],
        ];

        foreach ($destinations as $data) {
            $destination = Destination::updateOrCreate(['name' => $data['name']], $data);

            Package::updateOrCreate(
                ['destination_id' => $destination->id],
                [
                    'tag' => match ($destination->name) {
                        'Bali', 'Santorini' => 'Beach',
                        'Kyoto' => 'Culture',
                        'Leh-Ladakh', 'Reykjavik' => 'Adventure',
                        default => 'Explore',
                    },
                    'name' => $destination->name . ' Getaway',
                    'img' => str_replace('-travel/', '-pkg/', $destination->img),
                    'days' => 6,
                    'max_people' => 2,
                    'price_per_person' => $destination->price_from,
                    'description' => "A guided {$destination->name} trip covering the highlights, with flexible add-ons.",
                    'is_active' => true,
                ]
            );

            $flightPrice = match ($destination->name) {
                'Bali' => 18500, 'Kyoto' => 31500, 'Santorini' => 42000,
                'Leh-Ladakh' => 9500, 'Cape Town' => 47000, default => 52000,
            };
            $stayPrice = max(2500, (int) round($destination->price_from / 7));

            TravelOffer::updateOrCreate(
                ['destination_id'=>$destination->id, 'mode'=>'flights', 'provider'=>'Farwell Air'],
                [
                    'title'=>"Chennai to {$destination->name}",
                    'subtitle'=>'Round trip · Economy',
                    'img'=>$destination->img,
                    'price'=>$flightPrice,
                    'duration'=>'Flexible dates',
                    'rating'=>4.6,
                    'details'=>['1 cabin bag','Free date change','Economy'],
                    'is_active'=>true,
                ]
            );

            TravelOffer::updateOrCreate(
                ['destination_id'=>$destination->id, 'mode'=>'stays', 'provider'=>'Farwell Stays'],
                [
                    'title'=>"Handpicked stays in {$destination->name}",
                    'subtitle'=>'Comfort stay · Breakfast options',
                    'img'=>$destination->img,
                    'price'=>$stayPrice,
                    'duration'=>'Per night',
                    'rating'=>4.7,
                    'details'=>['Free Wi-Fi','Breakfast available','Free cancellation'],
                    'is_active'=>true,
                ]
            );
        }
    }
}
